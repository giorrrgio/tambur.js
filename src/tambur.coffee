static_url = "static.tambur.io/"
balancer_host = "balancer.tambur.io"
api_host = "api.tambur.io"

connection_id = 0
connections = []

class AbstractConnection
    constructor: (@socket_impl, args...) ->
        @id = connection_id += 1
        connections[@id] = this
        @streams = {}
        @waiting_cmds = []
        @call_handlers = {}
        @nr_of_calls = 0
        @no_auto_connect = false

        if args.length is 1 and typeof args[0] is 'object'
            dict = args[0]
            @api_key = dict.api_key
            @app_id = dict.app_id
            @ready = dict.ready ? ->
            @onclose = dict.onclose ? ->
            @ssl = dict.ssl ? false
            @max_retries = dict.max_retries ? 10
            @no_auto_connect = dict.no_auto_connect ? false
        else
            @api_key = args[0]
            @app_id = args[1]
            @ssl = args[2] ? false
            @ready = args[3] ? ->
            @onclose = args[4] ? ->
            @max_retries = args[5] ? 10

        if not @no_auto_connect
            @init_connect()

    init_connect: ->
        Utils.jsonp("#{ Utils.proto(@ssl) }//#{ balancer_host }/#{ @api_key }/#{ @app_id }?instance=#{ @id }&callback=tambur.Utils.connect_callback")        
    
    close: ->
        @closed_normaly = true
        @socket?.close()
    
    reopen: ->
        @reconnecting = true
        @init_connect()
    
    get_stream: (name) ->
        if @streams[name]
            @streams[name]
        else
            stream = new Stream(this, name)
            @streams[name] = stream
            stream

    send: (cmd, handler, args...) ->
        if @subscriber_id
            handle = @nr_of_calls += 1
            cmd = [cmd, handle]
            @call_handlers[handle] = handler
            @socket.send(JSON.stringify(cmd.concat(args)))
        else
            # our connection isn't ready yet, so we send
            # the data as soon as we are ready
            @waiting_cmds.push([cmd, handler, args])
            
        
    connect: (connection_id, connection_string) ->
        proto = if @ssl or (document.location.protocol is "https:") then "wss://" else "ws://"
        @socket = new @socket_impl("#{ proto }#{ connection_string }")
        @socket.onopen = ->
            tambur.Logger.debug("socket[#{ connection_id }] onopen")

        @socket.onmessage = (message) =>
            tambur.Logger.debug("socket[#{ connection_id }] onmessage: #{ message.data }")
            @retry = 0
            if not @subscriber_id
                @subscriber_id = message.data.substr(3)
                # if we have waiting cmds
                while @waiting_cmds.length
                    [cmd, handler, args] = @waiting_cmds.pop()
                    @send(cmd, handler, args...)
                # if we have some previously subscribed streams
                # and need to resubscribe in reconnect phase
                if @reconnecting
                    for stream_name, stream_obj of @streams
                        stream_obj.reopen()
                @reconnecting = false
                @ready()
            else
                message = JSON.parse(message.data)
                if message[0] is "ack"
                    handle = message[1]
                    if handle > 0
                        response = message[2]
                        @call_handlers[handle](response)
                    else
                        throw "process error #{ message[2]}" 
                else if message[0] is "msg"
                    # we got a message for a stream
                    stream = message[1]
                    if @streams[stream]?
                        data = message.splice(2)
                        @streams[stream].dispatch(data)
            
            @nr_of_messages += 1
        
        @socket.onclose = =>
            tambur.Logger.debug("socket[#{ connection_id }] onclose")
            @subscriber_id = undefined
            @socket = undefined
            @nr_of_messages = 0
            for stream_name, stream_obj of @streams
                stream_obj.conn_close() 
                
            if not @closed_normaly and not @no_auto_connect
                @reconnecting = true
                retries = @retry
                if @retry < @max_retries
                    setTimeout( =>
                        tambur.Logger.debug("reconnect")
                        @init_connect()
                    , 1000)
                    retries += 1

            @onclose()


class WebSocketConnection extends AbstractConnection
    constructor: (args...) ->
        super(ws(), args...)
        
    ws = ->
        window["WebSocket"] or window["MozWebSocket"]
        
class FlashSocketConnection extends AbstractConnection
    constructor: (args...) ->
        if swfobject.hasFlashPlayerVersion("1")
            window.WebSocket = undefined
            window.WEB_SOCKET_SWF_LOCATION = "#{ Utils.proto() }#{ static_url }WebSocketMainInsecure.swf"
            Utils.fetch_js("web_socket.min.js", =>
                tambur.Logger.debug("trigger_flash_socket_init returned, start with normal socket init")
                super(WebSocket, args...)
            )
        else
            tambur.Logger.error("we cannot fallback to flash, please install flash")

class CometSocketConnection extends AbstractConnection
    constructor: (args...) ->
        super(CometSocket, args...)

class ConnectionFactory extends AbstractConnection
    @get_connection = (args...) ->
        if window["WebSocket"] or window["MozWebSocket"]
            new WebSocketConnection(args...)
        else if swfobject.hasFlashPlayerVersion("1")
            new FlashSocketConnection(args...)
        else
            new CometSocketConnection(args...)

class CometSocket
    @comet_counter = 0
    @instances = []

    constructor: (connection_string) ->
        @id = CometSocket.comet_counter += 1
        CometSocket.instances[@id] = this
        @head = document.getElementsByTagName("head").item(0)
        a = document.createElement("a")
        a.href = if connection_string.indexOf("wss://") is 0 then "ws://#{ connection_string[6..] }" else connection_string
        path = a.pathname.split("/")
        @connection_string = "https://#{ a.host }/comet/#{ path[1] }/#{ path[2] }/"
        Utils.jsonp("https://#{ a.host }/comet#{ a.pathname }?instance=#{ @id }&callback=tambur.Comet.oninit&ts=#{ Date.now() }", => poll.call(this))
    
    onmessage: ->
    onclose: ->
    onopen: ->
    close: ->
        @onclose()
        @send("fin")
        delete CometSocket.instances[@id]

    send: (msg) ->
        if msg is "fin"
            @got_fin = true
        Utils.jsonp("#{ @connection_string }&callback=tambur.Comet.receive&data=#{ encodeURIComponent(msg) }&ts=#{ Date.now() }")

    @oninit = (id, data) ->
        socket = CometSocket.instances[id]
        socket.onopen()
        socket.connection_string = "#{ socket.connection_string}#{ data.substr(3) }?instance=#{ socket.id }"
        socket.onmessage({data : data})

    @receive = (id, data) ->
        socket = CometSocket.instances[id]
        socket.onmessage({data : JSON.stringify(data)})

    @polling = (id, data) ->
        socket = CometSocket.instances[id]
        socket.onmessage({data : JSON.stringify(data)})

    poll = ->
        if not @got_fin
            Utils.jsonp("#{ @connection_string }&callback=tambur.Comet.polling&ts=#{ Date.now() }", => poll.call(this))

window.onbeforeunload = ->
    for socket in tambur.Comet.instances
        socket.send("fin")

class Stream
    constructor: (@connection, @stream) ->
        @onmessage = ->
        if stream is "private"
            @is_private = true
        else
            @ready = ->
            @onauth = ->
            @onpresence = ->
            @ondirect = ->
            @onenabled = ->
            @ondisabled = ->
            @enabled_modes = {auth : false, presence : false, direct : false}
            @direct_user_id = false
            subscribe.call(this)

    
    close: ->
        if not @active
            throw { name: "Stream Error", message: "Stream is inactive" };
        @connection.send("unsubscribe", ((response) =>
            if response is "ok" then @active = false), @stream)
    
    reopen: ->
        subscribe.call(this)
        
    enable_auth: (token) -> enable_mode.call(this, "auth", token)
    enable_presence: (user_id, token) -> enable_mode.call(this, "presence", user_id, token)
    enable_direct: (user_id, token) -> enable_mode.call(this, "direct", @direct_user_id = user_id, token)
    
    disable_auth: -> disable_mode.call(this, "auth")
    disable_presence: -> disable_mode.call(this, "presence")
    disable_direct: -> disable_mode.call(this, "direct", @direct_user_id)
          
    conn_close: ->
        @active = false
        
    dispatch: (msg) ->
        [mode, data] = msg
        tambur.Logger.debug "stream[ #{ @stream } ] dispatch for mode: #{ mode } data: #{ data}"
        switch mode
            when "auth" then @onauth(data)
            when "presence" then @onpresence(data)
            when "direct" then @ondirect(data)
            else @onmessage(data)
            
    direct_msg: (receiver_user_id, msg) ->
        if not @active
            throw { name: "Stream Error", message: "You cannot send a direct message through an inactive stream" }
        if @enabled_modes.direct is false
            throw { name: "Stream Error", message: "Direct Mode is not enabled" }
        @connection.send("direct", ((response) =>
                if response is "ok"
                    tambur.Logger.debug("message dispatched to #{ receiver_user_id }")
                else
                    tambur.Logger.error("not able to dispatch message: #{ msg } for reason #{ response }")
            ),@stream, receiver_user_id, msg)    
            
    # Private Funtions   
    subscribe = ->
        if @active
            throw { name: "Stream Error", message: "Stream is already active" }
        
        @connection.send("subscribe", ((response) =>
            if response is "ok"
                @active = true
                @ready()
            else if response is "already_subscribed"
                throw { name: "Stream Error", message: "Stream is already subscribed" }
            ), @stream)
            
    enable_mode = (args...) -> change_mode.call(this, "set_mode", args...)
    disable_mode = (args...) -> change_mode.call(this, "unset_mode", args...)
    
    change_mode = (cmd, mode, args...) ->
        if not @active
            throw { name: "Stream Error", message: "Stream is inactive" };
        if cmd is "set_mode" and @enabled_modes[mode]
            throw { name: "Mode Error", message: "Mode is already enabled" }
        if cmd is "unset_mode" and @enabled_modes[mode] is false
            throw { name: "Mode Error", message: "Mode is not enabled" }
        @connection.send(cmd, ((response) =>
            if response is "ok"
                if cmd is "set_mode"
                    @enabled_modes[mode] = true
                    @onenabled(mode)
                else if cmd is "unset_mode"
                    @enabled_modes[mode] = false
                    @ondisabled(mode)
            ), mode, @stream, args...)
            
class Utils
    @proto = (force_ssl) ->
        proto = document.location.protocol
        if (proto is 'https:') or force_ssl then 'https://' else 'http://'

    @jsonp = (url, callback) ->
        # 
        # Dynamically fetch Javascript resource and append
        # it to the head of the document. The callback is
        # fired as soon as the fetch has completed
        #
        script = document.createElement("script")
        script.setAttribute("type", "text/javascript")
        script.setAttribute("src", url)
        #
        # bind onload events to the callback function
        #
        call_callback = ->
            if callback then callback()
            document.getElementsByTagName("head")[0].removeChild(script)

        script.onreadystatechange = call_callback
        script.onload = call_callback
        if script then document.getElementsByTagName("head")[0].appendChild(script)
        script

    @fetch_js = (filename, callback, force_ssl) ->
        @jsonp("#{ @proto(force_ssl) }//#{ static_url }#{ filename }", callback)
            
    @connect_callback = (connection_id, connection_string) ->
        connection = connections[connection_id]
        connection.connect(connection_id, connection_string)

    @ajax =  (method, action, data, onsuccess, onerror) ->
        xml_http_request = undefined
        onsuccess = onsuccess ? ->
        onerror = onerror ? ->
        try
            # Mozilla, Opera, Safari, and Internet Explorer (v7+)
            xml_http_request = new XMLHttpRequest();
        catch error
            try
                xml_http_request = new ActiveXObject("Microsoft.XMLHTTP")
            catch error
                try
                    # Internet Explorer v6+
                    xml_http_request = new ActiveXObject("Msxml2.XMLHTTP")
                catch error
                    tambur.Logger.error "can't use ajax in this browser"

        if xml_http_request
            xml_http_request.open(method, action, true)
            if data
                xml_http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xml_http_request.onreadystatechange = ->
                if xml_http_request.readyState is 4
                    if xml_http_request.status is 204 or xml_http_request.status is 200
                        onsuccess(xml_http_request.responseText)
                    else
                        onerror(xml_http_request.responseText)
            
            if data? and method is "POST"
                xml_http_request.send(data)
            else
                xml_http_request.send()
            true
        else
            false
            
# namespace function from the coffeescript faq
namespace = (target, name, block) ->
    [target, name, block] = [(if typeof exports isnt 'undefined' then exports else window), arguments...] if arguments.length < 3
    top    = target
    target = target[item] or= {} for item in name.split '.'
    block target, top

namespace "tambur", (exports) ->
    exports.Comet = CometSocket
    exports.Utils = Utils
    if window.TAMBUR_FORCE_FLASH
        exports.Connection = (args...) -> new FlashSocketConnection(args...)
    else if window.TAMBUR_FORCE_COMET
        exports.Connection = (args...) -> new CometSocketConnection(args...)
    else
        exports.Connection = (args...) -> ConnectionFactory.get_connection(args...)

    if window.TAMBUR_DEBUG
        if window.TAMBUR_LOGGER
            exports.Logger = window.TAMBUR_LOGGER
        else if (window.console && window.console.log && window.console.error)
            exports.Logger = window.console
        else
            exports.Logger = { 
                log : -> , 
                error: -> , 
                debug: ->
            }
    else
        exports.Logger = { 
            log : -> , 
            error : ->, 
            debug : ->
        }

if not window["JSON"]
    Utils.fetch_js("json2.min.js")

