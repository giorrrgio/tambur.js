(function (tambur, undefined) {
    "use strict";
    /*global window*/
    /*global XMLHttpRequest*/
    /*global ActiveXObject*/
    /*global document*/

    function ajax (method, action, data, onsuccess, onerror) {
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
            xmlHttp.open(method, action, true);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 204 || xmlHttp.status === 200) {
                        onsuccess(xmlHttp.responseText);
                    } else {
                        onerror(xmlHttp.responseText);
                    }
                } else {
                    onerror(xmlHttp.responseText);
                }
            };
            xmlHttp.send(data);
        }
    }

    function jsonp (url, callback) {
        /*
         * Dynamically fetch Javascript resource and append
         * it to the head of the document. The callback is
         * fired as soon as the fetch has completed
         */
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);

        // bind onload events to the callback function
        script.onreadystatechange = callback || function () {};
        script.onload = callback || function () {};

        if (typeof script !== "undefined") {
            document.getElementsByTagName("head")[0].appendChild(script);
        }
        return script;
    }

    tambur.utils = {
        fetch_js : function (filename, callback) {
            filename = ('https:' === document.location.protocol ? 'https://' : 'http://') + tambur.static_url + filename;
            return jsonp(filename, callback);
        },

        jsonp : function (url, callback) { return jsonp(url, callback); },

        ajax_post : function (action, data, onsuccess, onerror) {
            ajax('POST', action, data, onsuccess, onerror);
        },
        ajax_get : function (action, data, onsuccess, onerror) {
            ajax('GET', action, data, onsuccess, onerror);
        }
    };

}(window.tambur = window.tambur || {}));
