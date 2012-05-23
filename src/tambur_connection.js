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
        window.WebSocket = undefined;
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
            if (window.TAMBUR_FORCE_FLASH) {
                trigger_flash_socket_init(connection);
                return;
            }

            if (window.TAMBUR_FORCE_COMET) {
                window.WebSocket = tambur.Comet;
            }

            if (window["WebSocket"] !== undefined || window["MozWebSocket"] !== undefined) {
                tambur.WebSocket = window["WebSocket"] || window["MozWebSocket"];
                trigger_socket_init(connection);
            } else {
                if (swfobject.hasFlashPlayerVersion("1")) {
                    /*
                     * at this moment we download the web_socket.js
                     * flash fallback for browser who do not support
                     * websockets out of the box. After the successful
                     * download we will call Tambur.__init_ws from there
                     * */
                    trigger_flash_socket_init(connection);
                } else {
                    tambur.WebSocket = tambur.Comet;
                    trigger_socket_init(connection);
                }
            }
        };

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
}(window.tambur = window.tambur || {}));
