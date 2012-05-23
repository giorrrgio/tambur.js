/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
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
