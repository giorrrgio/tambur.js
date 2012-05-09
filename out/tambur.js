(function (tambur, undefined) {
    "use strict";
    /*global window*/
    /*global document*/
    /*global WebSocket*/

    // Private properties
    var connection_id = 1,
        connections = {};

    // Public properties
    tambur.static_url = "tamburio.github.com/tambur.js/";
    tambur.api_host = "api.tambur.io";
    tambur.balancer_host = "balancer.tambur.io";
    tambur.WebSocket = false;

    // Private methods
    function trigger_socket_init(connection) {
        var conn_id = connection_id += 1,
            balancer_url = (connection.ssl === true ? "https://" : "http://") + tambur.balancer_host + "/" + connection.api_key + "/" + connection.app_id + "?instance=" + conn_id + "&callback=tambur.jsonp_connect_ws",
            script = document.createElement('script');

        connections[conn_id] = connection;
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", balancer_url);

        if (typeof script !== "undefined") {
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    }

    function trigger_flash_socket_init(connection) {
        window.WEB_SOCKET_SWF_LOCATION = (connection.ssl === true ? "https://" : "http://") + tambur.static_url + "deps/WebSocketMainInsecure.swf";
        tambur.utils.fetch_js("out/web_socket.min.js", function () {
            tambur.logger.debug("trigger_flash_socket_init returned, start with normal socket init");
            tambur.WebSocket = window["WebSocket"];
            trigger_socket_init(connection);
        });
    }

    function onmessage(connection, msg) {
        connection.retry = 0;
        if (connection.nr_of_msgs === 0) {
            // SubscriberId Msg has the form of "id:UUID"
            connection.subscriber_id = msg.data.substr(3);
            connection.ready();
        } else {
            msg = JSON.parse(msg.data);
            if (msg[0] === "ack") {
                var handle = msg[1];
                if (handle > 0) {
                    var response = msg[2];
                    var response_handler = connection.response_handler[handle];
                    response_handler(response);
                    delete connection.response_handler[handle];
                } else {
                    throw "process error: "+msg[2];
                }
            } else if (msg[0] === "msg") {
                // we got a message for a stream
                var stream = msg[1];
                var data = msg.splice(2);
                if (connection.streams[stream]) {
                    connection.streams[stream].dispatch(data);
                }
            }
        }
        connection.nr_of_msgs += 1;
    }

    function onclose(connection) {
        connection.subscriber_id = false;
        connection.socket = false;
        connection.nr_of_msgs = 0;
        var retries = connection.retry;
        if (connection.retry < connection.max_retries) {
            setTimeout(function () {
                connection = new tambur.Connection(connection);
                connection.retry = retries;
            }, 1000);
            retries += 1;
        }
    }

    function get_connection() {
        return {
            api_key : false,
            app_id : false,
            ready : function () {},
            ssl : false,
            max_retries : 10,
            subscriber_id : false,
            streams : {},
            socket : false,
            retry : 0,
            nr_of_msgs : 0,
            response_handler : {},
            calls : [],
            nr_of_calls : 0,
            // functions
            get_stream : function (name) {
                if (typeof this.streams[name] === "undefined") {
                    this.streams[name] = new tambur.Stream(this, name);
                }
                return this.streams[name];
            }
        };
    }

    // Public methods
    tambur.Connection = function () {
        var connection = get_connection();
        if (arguments.length === 1 && typeof arguments[0] === 'object') {
            // we assume we got a dictionary as param
            var dict = arguments[0];
            connection.api_key = dict.api_key;
            connection.app_id = dict.app_id;
            connection.ready = dict.ready || function() {};
            connection.ssl = dict.ssl || false;
            connection.max_retries = dict.max_retries || 10;
        } else {
            connection.api_key = arguments[0];
            connection.app_id = arguments[1];
        }

        var init = function() {
            if (!window.TAMBUR_FORCE_FLASH && (window["WebSocket"] !== undefined || window["MozWebSocket"] !== undefined)) {
                tambur.WebSocket = window["WebSocket"] || window["MozWebSocket"];
                trigger_socket_init(connection);
            } else {
                /*
                 * at this moment we download the web_socket.js
                 * flash fallback for browser who do not support
                 * websockets out of the box. After the successful
                 * download we will call Tambur.__init_ws from there
                 * */
                trigger_flash_socket_init(connection);
            }
        }

        if (window["JSON"] !== undefined) {
            init();
        } else {
            tambur.utils.fetch_js("out/json2.min.js", init);
        }

        return connection;
    };

    tambur.jsonp_connect_ws = function (conn_id, connection_string) {
        tambur.logger.debug("jsonp_connect_ws returned: " + connection_string);
        var connection = connections[conn_id];

        connection.socket = new tambur.WebSocket((connection.ssl === true ? "wss://" : "ws://") + connection_string);
        connection.socket.onopen = function () {
            tambur.logger.debug("socket[" + conn_id + "] onopen");
        };
        connection.socket.onmessage = function (msg) {
            tambur.logger.debug("socket[" + conn_id + "] onmessage: " + msg.data);
            onmessage(connection, msg);
        };
        connection.socket.onclose = function () {
            tambur.logger.debug("socket[" + conn_id + "] onclose");
            onclose(connection);
        };
    };

    if (window["JSON"] == undefined) {

    }

}(window.tambur = window.tambur || {}));

(function (tambur, undefined) {
    "use strict";
    /*global window*/

    if (window.TAMBUR_DEBUG) {
        if (window.TAMBUR_LOGGER) {
            tambur.logger = TAMBUR_LOGGER;
        } else if (window.console && window.console.log && window.console.error) {
            // In some environments console is defined but console.log or console.error is missing.
            tambur.logger = window.console;
        } else {
            tambur.logger = {
                log : function () {},
                error : function () {},
                debug : function () {}
            };
        }
    } else {
        tambur.logger = {
            log : function () {},
            error : function () {},
            debug : function () {}
        };
    }

}(window.tambur = window.tambur || {}));

(function (tambur, undefined) {
    "use strict";
    /*global window*/
    /*global document*/

    tambur.utils = {
        /*
         * Dynamically fetch Javascript resource and append
         * it to the head of the document. The callback is
         * fired as soon as the fetch has completed
         */
        fetch_js : function (filename, callback) {
            var script = document.createElement('script');
            filename = ('https:' === document.location.protocol ? 'https://' : 'http://') + tambur.static_url + filename;
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", filename);

            // bind onload events to the callback function
            script.onreadystatechange = callback;
            script.onload = callback;

            if (typeof script !== "undefined") {
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        }
    };

}(window.tambur = window.tambur || {}));

(function (tambur, undefined) {
    "use strict";
    /*global window*/

    // Private methods
    function subscribe(stream) {
        if (!stream.active) {
            var handle = stream.connection.nr_of_calls += 1,
                cmd = ["subscribe", handle, stream.name];
                //cmd = "subscribe:" + handle + ":" + stream.name;
            stream.connection.response_handler[handle] = function (response) {
                if (response === "ok") { stream.active = true; }
            };
            tambur.logger.debug(cmd);
            stream.connection.socket.send(JSON.stringify(cmd));
        }
    }

    function unsubscribe(stream) {
        if (stream.active) {
            var handle = stream.connection.nr_of_calls += 1,
                cmd = ["unsubscribe", handle, stream.name];
                //cmd = "unsubscribe:" + handle + ":" + stream.name;
            stream.connection.response_handler[handle] = function (response) {
                if (response === "ok") { stream.active = false; }
            };
            tambur.logger.debug(cmd);
            stream.connection.socket.send(JSON.stringify(cmd));
        }
    }

    function enable_mode(stream, mode, token, params) {
        if (stream.active && !stream.enabled_modes[mode]) {
            var handle = stream.connection.nr_of_calls += 1,
                cmd = ["set_mode", handle, mode, stream.name];
            stream.connection.response_handler[handle] = function (response) {
                if (response === "ok") {
                    stream.enabled_modes[mode] = true;
                    stream.onenabled(mode);
                }
            };
            if (typeof params !== "undefined") {
                cmd.push(params);
            }
            cmd.push(token);
            tambur.logger.debug(cmd);
            stream.connection.socket.send(JSON.stringify(cmd));
        }
    }

    function disable_mode(stream, mode, params) {
        if (stream.active && stream.enabled_modes[mode]) {
            var handle = stream.connection.nr_of_calls += 1,
                cmd = ["unset_mode", handle, mode, stream.name];
            if (mode === "direct") {
                cmd.push(params);
            }
            stream.connection.response_handler[handle] = function (response) {
                if (response === "ok") {
                    stream.enabled_modes[mode] = false;
                    stream.ondisabled(mode);
                }
            };
            tambur.logger.debug(cmd);
            stream.connection.socket.send(JSON.stringify(cmd));
        }
    }

    function direct_msg(stream, receiver_user_id, msg) {
        if (stream.active && stream.enabled_modes["direct"]) {
            var handle = stream.connection.nr_of_calls =+ 1,
                cmd = ["direct", handle, stream.name, receiver_user_id, msg];
            stream.connection.response_handler[handle] = function (response) {
                if (response === "ok") {
                    tambur.logger.debug("message dispatched to: "+receiver_user_id);
                } else {
                    tambur.logger.debug("not able to dispatch message: "+msg +"for reason: "+response);
                }
            };
            tambur.logger.debug(cmd);
            stream.connection.socket.send(JSON.stringify(cmd));
        }
    }

    tambur.Stream = function (connection, name) {
        var stream = {
            name : name,
            active : false,
            is_private : false,
            connection : connection,
            ready : function () {},
            onmessage : function () {},
            onauth : function () {},
            onpresence : function () {},
            ondirect : function () {},
            onenabled : function () {},
            ondisabled : function () {},
            enabled_modes : {auth : false, presence : false, direct : false},
            direct_user_id : false,

            // functions
            close : function () {
                unsubscribe(this);
            },
            reopen : function () {
                subscribe(this);
            },
            enable_auth : function (token) {
                enable_mode(this, "auth", token);
            },
            enable_presence : function (user_id, token) {
                enable_mode(this, "presence", token, user_id);
            },
            enable_direct : function (user_id, token) {
                this.direct_user_id = user_id;
                enable_mode(this, "direct", token, user_id);
            },
            disable_auth : function () {
                disable_mode(this, "auth", "");
            },
            disable_presence : function () {
                disable_mode(this, "presence", "");
            },
            disable_direct : function () {
                disable_mode(this, "direct", this.direct_user_id);
            },
            direct_msg : function(receiver_user_id, msg) {
                direct_msg(this, receiver_user_id, msg);
            },

            dispatch : function (msg) {
                var mode = msg[0];
                var data = msg[1];
                tambur.logger.debug("stream[" + this.name + "] dispatch msg:" + msg);
                if (mode === "auth") {
                    this.onauth(data);
                } else if (mode === "presence") {
                    this.onpresence(data);
                } else if (mode === "direct") {
                    this.ondirect(data);
                } else {
                    this.onmessage(data);
                }
            }
        };
        if (name === "private") {
            stream.is_private = true;
            stream.active = true;

            delete stream.ready;
            delete stream.onauth;
            delete stream.onpresence;
            delete stream.ondirect;
            delete stream.onenabled;
            delete stream.ondisabled;
            delete stream.enabled_modes;
            delete stream.direct_user_id;

            delete stream.close;
            delete stream.reopen;
            delete stream.enable_auth;
            delete stream.enable_presence;
            delete stream.enable_direct;
            delete stream.disable_auth;
            delete stream.disable_presence;
            delete stream.disable_direct;
            delete stream.direct_msg;
        } else {
            subscribe(stream);
        }
        return stream;
    };

}(window.tambur = window.tambur || {}));
