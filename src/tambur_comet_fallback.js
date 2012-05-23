(function (tambur, undefined) {
    "use strict";
    /*global window*/

    var head = undefined;
    var tambur_comets = {};
    var tambur_jsonp_tags = {};
    var tambur_comet_tags = {};
    var tambur_comet_counter = 1;

    function send (socket, msg) {
        var tag = tambur.utils.jsonp(socket.connection_string + "&callback=tambur.jsonp_receive&data=" + encodeURIComponent(msg) +"&ts=" + Date.now());
        tambur_jsonp_tags[socket.id] = tag;
    }

    function poll (socket) {
        var tag = tambur.utils.jsonp(socket.connection_string + "&callback=tambur.comet_poll&ts=" + Date.now(),
            function() {poll(socket);});
        tambur_comet_tags[socket.id] = tag;
    }

    function remove_jsonp_tag(socket_id) {
        var script_tag = tambur_jsonp_tags[socket_id];
        remove_tag(script_tag);
    }
    function remove_comet_tag(socket_id) {
        var script_tag = tambur_comet_tags[socket_id];
        remove_tag(script_tag);
    }
    function remove_tag(script_tag) {
        if (typeof head != 'object')  {
            head = document.getElementsByTagName("head").item(0);
        }
        try {
            head.removeChild(script_tag);
        } catch (e) {
            // we can't remove the script element, should never happen
            // but unfortunately it does.... :S
            tambur.logger.debug(e);
        }
    }

    tambur.jsonp_receive = function(socket_id, data) {
        var socket = tambur_comets[socket_id];
        socket.onmessage({data : JSON.stringify(data)});
        remove_jsonp_tag(socket_id);
    };

    tambur.comet_init = function(socket_id, data) {
        // special treatment of first init message containing the subscriber_id
        var socket = tambur_comets[socket_id];
        socket.onopen();
        socket.connection_string += data.substr(3) + "?instance="+socket_id;
        socket.onmessage({data : data});
        remove_comet_tag(socket_id);
    };

    tambur.comet_poll = function(socket_id, data) {
        var socket = tambur_comets[socket_id];
        socket.onmessage({data : JSON.stringify(data)});
        remove_comet_tag(socket_id);
    };

    tambur.Comet = function(connection_string) {
        // parse url
        var a = document.createElement('a');
        a.href = connection_string;
        var instance = tambur_comet_counter + "";
        var jsonp = "?instance="+ instance + "&callback=tambur.comet_init";
        var protocol = (a.protocol === "ws:") ? "http:" : "https:";
        connection_string = protocol + "//" + a.host + "/comet" + a.pathname + jsonp;
        var path = a.pathname.split("/");
        var socket = {
            id : instance,
            connection_string : protocol + "//" + a.host + "/comet/" + path[1] + "/" + path[2] + "/",
            onmessage : function() {},
            onclose : function() {},
            onopen : function() {},
            send : function(msg) {
                send(this, msg);
            }
        };
        tambur_comets[instance] = socket;
        tambur_comet_counter += 1;
        setTimeout(function(){
            tambur_comet_tags[instance] = tambur.utils.jsonp(connection_string + "&ts=" + Date.now(),
                function() {poll(socket);});
        }, 1);
        return socket;
    };

    window.onbeforeunload = function () {
        for (var i = 1; i < tambur_comet_counter; i++) {
            var socket = tambur_comets[i + ""];
            socket.send("fin");
        }
    };

}(window.tambur = window.tambur || {}));
