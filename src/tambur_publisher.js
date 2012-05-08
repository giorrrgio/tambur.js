(function (tambur, undefined) {
    "use strict";
    /*global window*/
    /*global document*/
    /*global XMLHttpRequest*/
    /*global ActiveXObject*/
    /*global OAuth*/

    function ajax_post(action, data, onsuccess, onerror) {
        var xmlHttp = null;
        onsuccess = onsuccess || function () {};
        onerror = onerror || function () {};
        try {
            // Mozilla, Opera, Safari sowie Internet Explorer (ab v7)
            xmlHttp = new XMLHttpRequest();
        } catch (e1) {
            try {
                // MS Internet Explorer (ab v6)
                xmlHttp  = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
                try {
                    // MS Internet Explorer (ab v5)
                    xmlHttp  = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e3) {
                    xmlHttp  = null;
                }
            }
        }
        if (xmlHttp) {
            xmlHttp.open('POST', action, true);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 204) {
                        onsuccess();
                    } else {
                        onerror();
                    }
                } else {
                    onerror();
                }
            };
            xmlHttp.send(data);
        }
    }

    function publish(publisher, stream, message, do_debug) {
        var oauth_params = {},
            oauth_base = null,
            oauth_signer = null,
            data = "",
            tmp = null,
            action = ('https:' === document.location.protocol ? 'https://' : 'http://') + tambur.api_host + "/app/" + publisher.connection.app_id + "/stream/" + stream;
        oauth_params = {
            oauth_version: "1.0",
            oauth_consumer_key: publisher.connection.api_key,
            oauth_timestamp: OAuth.timestamp(),
            oauth_nonce: OAuth.nonce(32),
            oauth_signature_method: "HMAC-SHA1",
            api_version: "1.0",
            message: message
        };
        oauth_base = OAuth.SignatureMethod.getBaseString({method: 'POST', action: action, parameters: oauth_params});
        oauth_signer = OAuth.SignatureMethod.newMethod("HMAC-SHA1",
                {consumerSecret: publisher.secret, tokenSecret: ""});
        oauth_params.oauth_signature = encodeURIComponent(oauth_signer.getSignature(oauth_base));
        for (tmp in oauth_params) {
            if (tmp) {
                data += tmp + "=" + oauth_params[tmp] + "&";
            }
        }
        data = data.slice(0, data.length - 1); // remove last &

        if (do_debug === true) {
            action = action + "?debug=true";
        }

        ajax_post(action, data);
    }

    function generate_mode_token(publisher, mode, property) {
        var conn = publisher.connection,
            text = conn.api_key + ':' + conn.app_id + ':' + mode + ':' + property + ':' + conn.subscriber_id;
        return hex_hmac_sha1(publisher.secret, text);
    }

    tambur.Publisher = function (connection, secret) {
        var publisher = {
            connection : connection,
            secret : secret,

            // functions
            publish : function (stream, message, do_debug) {
                if (stream === "private") {
                    stream += ":" + this.connection.subscriber_id;
                }
                publish(this, stream, message, do_debug);
            },
            generate_auth_token : function (stream) {
                return generate_mode_token(this, 'auth', stream);
            },
            generate_presence_token : function (stream, user_id) {
                return generate_mode_token(this, 'presence', stream + ":" + user_id);
            },
            generate_direct_token : function (stream, user_id) {
                return generate_mode_token(this, 'direct', stream + ":" + user_id);
            },
        };
        return publisher;
    };

}(window.tambur = window.tambur || {}));
