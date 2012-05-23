(function (tambur, undefined) {
    "use strict";
    /*global window*/

    // Private methods
    function subscribe(stream) {
        if (stream.active) {
            throw {
                name : "Stream Error",
                message : "Stream is already active"
            };
        }

        var handle = stream.connection.nr_of_calls += 1,
            cmd = ["subscribe", handle, stream.name];
            //cmd = "subscribe:" + handle + ":" + stream.name;
        stream.connection.response_handler[handle] = function (response) {
            if (response === "ok") {
                stream.active = true;
                stream.ready();
            }
        };
        tambur.logger.debug(cmd);
        stream.connection.socket.send(JSON.stringify(cmd));
    }

    function unsubscribe(stream) {
        if (!stream.active) {
            throw {
                name : "Stream Error",
                message : "Stream is inactive"
            };
        }

        var handle = stream.connection.nr_of_calls += 1,
            cmd = ["unsubscribe", handle, stream.name];
            //cmd = "unsubscribe:" + handle + ":" + stream.name;
        stream.connection.response_handler[handle] = function (response) {
            if (response === "ok") { stream.active = false; }
        };
        tambur.logger.debug(cmd);
        stream.connection.socket.send(JSON.stringify(cmd));
    }

    function enable_mode(stream, mode, token, params) {
        if (!stream.active) {
            throw {
                name : "Stream Error",
                message : "You cannot enable a mode for an inactive stream"
            };
        }

        if (stream.enabled_modes[mode]) {
            throw {
                name : "Mode Error",
                message : "Mode is already enabled"
            };
        }
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

    function disable_mode(stream, mode, params) {
        if (!stream.active) {
            throw {
                name : "Stream Error",
                message : "You cannot disable a mode for an inactive stream"
            };
        }

        if (typeof stream.enabled_modes[mode] === "undefined") {
            throw {
                name : "Mode Error",
                message : "Mode is not enabled"
            };
        }
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

    function direct_msg(stream, receiver_user_id, msg) {
        if (!stream.active) {
            throw {
                name : "Stream Error",
                message : "You cannot send a direct message through an inactive stream"
            };
        }

        if (typeof stream.enabled_modes["direct"] === "undefined") {
            throw {
                name : "Mode Error",
                message : "Direct Mode is not enabled"
            };
        }

        var handle = stream.connection.nr_of_calls += 1,
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
                tambur.logger.debug("stream[" + this.name + "] dispatch for mode: " + mode + " data: " + data);
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
