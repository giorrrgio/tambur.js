api_host = "api.tambur.io"

class Publisher
    constructor: (@connection, @secret) ->
    publish: (stream, message, do_debug) ->
        stream = if stream is "private" then stream += ":" + @connection.subscriber_id else stream
        action = "#{ tambur.Utils.proto(@connection.ssl) }#{ api_host }/app/#{ @connection.app_id }/stream/#{ stream }"
        oauth_params = {
            oauth_version: "1.0",
            oauth_consumer_key: @connection.api_key,
            oauth_timestamp: OAuth.timestamp(),
            oauth_nonce: OAuth.nonce(32),
            oauth_signature_method: "HMAC-SHA1",
            api_version: "1.0",
            message: message
        }
        oauth_base = OAuth.SignatureMethod.getBaseString({method: "POST", action: action, parameters: oauth_params})
        oauth_signer = OAuth.SignatureMethod.newMethod("HMAC-SHA1", {consumerSecret: @secret, tokenSecret: ""})
        oauth_params.oauth_signature = encodeURIComponent(oauth_signer.getSignature(oauth_base))

        data = for k, v of oauth_params
            "#{ k }=#{ v }"
        data = data.join("&")
        
        if do_debug then action += "?debug=true"
       
        tambur.Utils.ajax("POST", action, data)
    
    generate_auth_token: (stream) -> @generate_mode_token("auth", stream)
    generate_presence_token: (stream, user_id) -> @generate_mode_token("presence", "#{stream}:#{user_id}")
    generate_direct_token: (stream, user_id) -> @generate_mode_token("direct", "#{stream}:#{user_id}")
    generate_mode_token: (mode, property) ->
        c = @connection
        text = "#{ c.api_key }:#{ c.app_id }:#{ mode }:#{ property }:#{ c.subscriber_id}"
        hex_hmac_sha1(@secret, text)

namespace = (target, name, block) ->
    [target, name, block] = [(if typeof exports isnt 'undefined' then exports else window), arguments...] if arguments.length < 3
    top    = target
    target = target[item] or= {} for item in name.split '.'
    block target, top

namespace "tambur", (exports) ->
    exports.Publisher = (args...) -> new Publisher(args...)

if not window["JSON"]
    tambur.Utils.fetch_js("json2.min.js")

