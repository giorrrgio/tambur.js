/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
// Generated by CoffeeScript 1.3.3
(function() {
  var AbstractConnection, CometSocket, CometSocketConnection, ConnectionFactory, FlashSocketConnection, Stream, Utils, WebSocketConnection, api_host, balancer_host, connection_id, connections, namespace, static_url,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  static_url = "static.tambur.io/";

  balancer_host = "balancer.tambur.io";

  api_host = "api.tambur.io";

  connection_id = 0;

  connections = [];

  AbstractConnection = (function() {

    function AbstractConnection() {
      var args, dict, socket_impl, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
      socket_impl = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.socket_impl = socket_impl;
      this.id = connection_id += 1;
      connections[this.id] = this;
      this.streams = {};
      this.waiting_cmds = [];
      this.call_handlers = {};
      this.nr_of_calls = 0;
      this.no_auto_connect = false;
      if (args.length === 1 && typeof args[0] === 'object') {
        dict = args[0];
        this.api_key = dict.api_key;
        this.app_id = dict.app_id;
        this.ready = (_ref = dict.ready) != null ? _ref : function() {};
        this.onclose = (_ref1 = dict.onclose) != null ? _ref1 : function() {};
        this.ssl = (_ref2 = dict.ssl) != null ? _ref2 : false;
        this.max_retries = (_ref3 = dict.max_retries) != null ? _ref3 : 10;
        this.no_auto_connect = (_ref4 = dict.no_auto_connect) != null ? _ref4 : false;
      } else {
        this.api_key = args[0];
        this.app_id = args[1];
        this.ssl = (_ref5 = args[2]) != null ? _ref5 : false;
        this.ready = (_ref6 = args[3]) != null ? _ref6 : function() {};
        this.onclose = (_ref7 = args[4]) != null ? _ref7 : function() {};
        this.max_retries = (_ref8 = args[5]) != null ? _ref8 : 10;
      }
      if (!this.no_auto_connect) {
        this.init_connect();
      }
    }

    AbstractConnection.prototype.init_connect = function() {
      return Utils.jsonp("" + (Utils.proto(this.ssl)) + "//" + balancer_host + "/" + this.api_key + "/" + this.app_id + "?instance=" + this.id + "&callback=tambur.Utils.connect_callback");
    };

    AbstractConnection.prototype.close = function() {
      var _ref;
      this.closed_normaly = true;
      return (_ref = this.socket) != null ? _ref.close() : void 0;
    };

    AbstractConnection.prototype.reopen = function() {
      this.reconnecting = true;
      return this.init_connect();
    };

    AbstractConnection.prototype.get_stream = function(name) {
      var stream;
      if (this.streams[name]) {
        return this.streams[name];
      } else {
        stream = new Stream(this, name);
        this.streams[name] = stream;
        return stream;
      }
    };

    AbstractConnection.prototype.send = function() {
      var args, cmd, handle, handler;
      cmd = arguments[0], handler = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      if (this.subscriber_id) {
        handle = this.nr_of_calls += 1;
        cmd = [cmd, handle];
        this.call_handlers[handle] = handler;
        return this.socket.send(JSON.stringify(cmd.concat(args)));
      } else {
        return this.waiting_cmds.push([cmd, handler, args]);
      }
    };

    AbstractConnection.prototype.connect = function(connection_id, connection_string) {
      var proto,
        _this = this;
      proto = this.ssl || (document.location.protocol === "https:") ? "wss://" : "ws://";
      this.socket = new this.socket_impl("" + proto + connection_string);
      this.socket.onopen = function() {
        return tambur.Logger.debug("socket[" + connection_id + "] onopen");
      };
      this.socket.onmessage = function(message) {
        var args, cmd, data, handle, handler, response, stream, stream_name, stream_obj, _ref, _ref1;
        tambur.Logger.debug("socket[" + connection_id + "] onmessage: " + message.data);
        _this.retry = 0;
        if (!_this.subscriber_id) {
          _this.subscriber_id = message.data.substr(3);
          while (_this.waiting_cmds.length) {
            _ref = _this.waiting_cmds.pop(), cmd = _ref[0], handler = _ref[1], args = _ref[2];
            _this.send.apply(_this, [cmd, handler].concat(__slice.call(args)));
          }
          if (_this.reconnecting) {
            _ref1 = _this.streams;
            for (stream_name in _ref1) {
              stream_obj = _ref1[stream_name];
              stream_obj.reopen();
            }
          }
          _this.reconnecting = false;
          _this.ready();
        } else {
          message = JSON.parse(message.data);
          if (message[0] === "ack") {
            handle = message[1];
            if (handle > 0) {
              response = message[2];
              _this.call_handlers[handle](response);
            } else {
              throw "process error " + message[2];
            }
          } else if (message[0] === "msg") {
            stream = message[1];
            if (_this.streams[stream] != null) {
              data = message.splice(2);
              _this.streams[stream].dispatch(data);
            }
          }
        }
        return _this.nr_of_messages += 1;
      };
      return this.socket.onclose = function() {
        var retries, stream_name, stream_obj, _ref;
        tambur.Logger.debug("socket[" + connection_id + "] onclose");
        _this.subscriber_id = void 0;
        _this.socket = void 0;
        _this.nr_of_messages = 0;
        _ref = _this.streams;
        for (stream_name in _ref) {
          stream_obj = _ref[stream_name];
          stream_obj.conn_close();
        }
        if (!_this.closed_normaly && !_this.no_auto_connect) {
          _this.reconnecting = true;
          retries = _this.retry;
          if (_this.retry < _this.max_retries) {
            setTimeout(function() {
              tambur.Logger.debug("reconnect");
              return _this.init_connect();
            }, 1000);
            retries += 1;
          }
        }
        return _this.onclose();
      };
    };

    return AbstractConnection;

  })();

  WebSocketConnection = (function(_super) {
    var ws;

    __extends(WebSocketConnection, _super);

    function WebSocketConnection() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      WebSocketConnection.__super__.constructor.apply(this, [ws()].concat(__slice.call(args)));
    }

    ws = function() {
      return window["WebSocket"] || window["MozWebSocket"];
    };

    return WebSocketConnection;

  })(AbstractConnection);

  FlashSocketConnection = (function(_super) {

    __extends(FlashSocketConnection, _super);

    function FlashSocketConnection() {
      var args,
        _this = this;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (swfobject.hasFlashPlayerVersion("1")) {
        window.WebSocket = void 0;
        window.WEB_SOCKET_SWF_LOCATION = "" + (Utils.proto()) + static_url + "WebSocketMainInsecure.swf";
        Utils.fetch_js("web_socket.min.js", function() {
          tambur.Logger.debug("trigger_flash_socket_init returned, start with normal socket init");
          return FlashSocketConnection.__super__.constructor.apply(_this, [WebSocket].concat(__slice.call(args)));
        });
      } else {
        tambur.Logger.error("we cannot fallback to flash, please install flash");
      }
    }

    return FlashSocketConnection;

  })(AbstractConnection);

  CometSocketConnection = (function(_super) {

    __extends(CometSocketConnection, _super);

    function CometSocketConnection() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      CometSocketConnection.__super__.constructor.apply(this, [CometSocket].concat(__slice.call(args)));
    }

    return CometSocketConnection;

  })(AbstractConnection);

  ConnectionFactory = (function(_super) {

    __extends(ConnectionFactory, _super);

    function ConnectionFactory() {
      return ConnectionFactory.__super__.constructor.apply(this, arguments);
    }

    ConnectionFactory.get_connection = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (window["WebSocket"] || window["MozWebSocket"]) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args), t = typeof result;
          return t == "object" || t == "function" ? result || child : child;
        })(WebSocketConnection, args, function(){});
      } else if (swfobject.hasFlashPlayerVersion("1")) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args), t = typeof result;
          return t == "object" || t == "function" ? result || child : child;
        })(FlashSocketConnection, args, function(){});
      } else {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args), t = typeof result;
          return t == "object" || t == "function" ? result || child : child;
        })(CometSocketConnection, args, function(){});
      }
    };

    return ConnectionFactory;

  })(AbstractConnection);

  CometSocket = (function() {
    var poll;

    CometSocket.comet_counter = 0;

    CometSocket.instances = [];

    function CometSocket(connection_string) {
      var a, path,
        _this = this;
      this.id = CometSocket.comet_counter += 1;
      CometSocket.instances[this.id] = this;
      this.head = document.getElementsByTagName("head").item(0);
      a = document.createElement("a");
      a.href = connection_string.indexOf("wss://") === 0 ? "ws://" + connection_string.slice(6) : connection_string;
      path = a.pathname.split("/");
      this.connection_string = "https://" + a.host + "/comet/" + path[1] + "/" + path[2] + "/";
      Utils.jsonp("https://" + a.host + "/comet" + a.pathname + "?instance=" + this.id + "&callback=tambur.Comet.oninit&ts=" + (Date.now()), function() {
        return poll.call(_this);
      });
    }

    CometSocket.prototype.onmessage = function() {};

    CometSocket.prototype.onclose = function() {};

    CometSocket.prototype.onopen = function() {};

    CometSocket.prototype.close = function() {
      this.onclose();
      this.send("fin");
      return delete CometSocket.instances[this.id];
    };

    CometSocket.prototype.send = function(msg) {
      if (msg === "fin") {
        this.got_fin = true;
      }
      return Utils.jsonp("" + this.connection_string + "&callback=tambur.Comet.receive&data=" + (encodeURIComponent(msg)) + "&ts=" + (Date.now()));
    };

    CometSocket.oninit = function(id, data) {
      var socket;
      socket = CometSocket.instances[id];
      socket.onopen();
      socket.connection_string = "" + socket.connection_string + (data.substr(3)) + "?instance=" + socket.id;
      return socket.onmessage({
        data: data
      });
    };

    CometSocket.receive = function(id, data) {
      var socket;
      socket = CometSocket.instances[id];
      return socket.onmessage({
        data: JSON.stringify(data)
      });
    };

    CometSocket.polling = function(id, data) {
      var socket;
      socket = CometSocket.instances[id];
      return socket.onmessage({
        data: JSON.stringify(data)
      });
    };

    poll = function() {
      var _this = this;
      if (!this.got_fin) {
        return Utils.jsonp("" + this.connection_string + "&callback=tambur.Comet.polling&ts=" + (Date.now()), function() {
          return poll.call(_this);
        });
      }
    };

    return CometSocket;

  })();

  window.onbeforeunload = function() {
    var socket, _i, _len, _ref, _results;
    _ref = tambur.Comet.instances;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      socket = _ref[_i];
      _results.push(socket.send("fin"));
    }
    return _results;
  };

  Stream = (function() {
    var change_mode, disable_mode, enable_mode, subscribe;

    function Stream(connection, stream) {
      this.connection = connection;
      this.stream = stream;
      this.onmessage = function() {};
      if (stream === "private") {
        this.is_private = true;
      } else {
        this.ready = function() {};
        this.onauth = function() {};
        this.onpresence = function() {};
        this.ondirect = function() {};
        this.onenabled = function() {};
        this.ondisabled = function() {};
        this.enabled_modes = {
          auth: false,
          presence: false,
          direct: false
        };
        this.direct_user_id = false;
        subscribe.call(this);
      }
    }

    Stream.prototype.close = function() {
      var _this = this;
      if (!this.active) {
        throw {
          name: "Stream Error",
          message: "Stream is inactive"
        };
      }
      return this.connection.send("unsubscribe", (function(response) {
        if (response === "ok") {
          return _this.active = false;
        }
      }), this.stream);
    };

    Stream.prototype.reopen = function() {
      return subscribe.call(this);
    };

    Stream.prototype.enable_auth = function(token) {
      return enable_mode.call(this, "auth", token);
    };

    Stream.prototype.enable_presence = function(user_id, token) {
      return enable_mode.call(this, "presence", user_id, token);
    };

    Stream.prototype.enable_direct = function(user_id, token) {
      return enable_mode.call(this, "direct", this.direct_user_id = user_id, token);
    };

    Stream.prototype.disable_auth = function() {
      return disable_mode.call(this, "auth");
    };

    Stream.prototype.disable_presence = function() {
      return disable_mode.call(this, "presence");
    };

    Stream.prototype.disable_direct = function() {
      return disable_mode.call(this, "direct", this.direct_user_id);
    };

    Stream.prototype.conn_close = function() {
      return this.active = false;
    };

    Stream.prototype.dispatch = function(msg) {
      var data, mode;
      mode = msg[0], data = msg[1];
      tambur.Logger.debug("stream[ " + this.stream + " ] dispatch for mode: " + mode + " data: " + data);
      switch (mode) {
        case "auth":
          return this.onauth(data);
        case "presence":
          return this.onpresence(data);
        case "direct":
          return this.ondirect(data);
        default:
          return this.onmessage(data);
      }
    };

    Stream.prototype.direct_msg = function(receiver_user_id, msg) {
      var _this = this;
      if (!this.active) {
        throw {
          name: "Stream Error",
          message: "You cannot send a direct message through an inactive stream"
        };
      }
      if (this.enabled_modes.direct === false) {
        throw {
          name: "Stream Error",
          message: "Direct Mode is not enabled"
        };
      }
      return this.connection.send("direct", (function(response) {
        if (response === "ok") {
          return tambur.Logger.debug("message dispatched to " + receiver_user_id);
        } else {
          return tambur.Logger.error("not able to dispatch message: " + msg + " for reason " + response);
        }
      }), this.stream, receiver_user_id, msg);
    };

    subscribe = function() {
      var _this = this;
      if (this.active) {
        throw {
          name: "Stream Error",
          message: "Stream is already active"
        };
      }
      return this.connection.send("subscribe", (function(response) {
        if (response === "ok") {
          _this.active = true;
          return _this.ready();
        } else if (response === "already_subscribed") {
          throw {
            name: "Stream Error",
            message: "Stream is already subscribed"
          };
        }
      }), this.stream);
    };

    enable_mode = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return change_mode.call.apply(change_mode, [this, "set_mode"].concat(__slice.call(args)));
    };

    disable_mode = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return change_mode.call.apply(change_mode, [this, "unset_mode"].concat(__slice.call(args)));
    };

    change_mode = function() {
      var args, cmd, mode, _ref,
        _this = this;
      cmd = arguments[0], mode = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      if (!this.active) {
        throw {
          name: "Stream Error",
          message: "Stream is inactive"
        };
      }
      if (cmd === "set_mode" && this.enabled_modes[mode]) {
        throw {
          name: "Mode Error",
          message: "Mode is already enabled"
        };
      }
      if (cmd === "unset_mode" && this.enabled_modes[mode] === false) {
        throw {
          name: "Mode Error",
          message: "Mode is not enabled"
        };
      }
      return (_ref = this.connection).send.apply(_ref, [cmd, (function(response) {
        if (response === "ok") {
          if (cmd === "set_mode") {
            _this.enabled_modes[mode] = true;
            return _this.onenabled(mode);
          } else if (cmd === "unset_mode") {
            _this.enabled_modes[mode] = false;
            return _this.ondisabled(mode);
          }
        }
      }), mode, this.stream].concat(__slice.call(args)));
    };

    return Stream;

  })();

  Utils = (function() {

    function Utils() {}

    Utils.proto = function(force_ssl) {
      var proto;
      proto = document.location.protocol;
      if ((proto === 'https:') || force_ssl) {
        return 'https://';
      } else {
        return 'http://';
      }
    };

    Utils.jsonp = function(url, callback) {
      var call_callback, script;
      script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", url);
      call_callback = function() {
        if (callback) {
          callback();
        }
        return document.getElementsByTagName("head")[0].removeChild(script);
      };
      script.onreadystatechange = call_callback;
      script.onload = call_callback;
      if (script) {
        document.getElementsByTagName("head")[0].appendChild(script);
      }
      return script;
    };

    Utils.fetch_js = function(filename, callback, force_ssl) {
      return this.jsonp("" + (this.proto(force_ssl)) + "//" + static_url + filename, callback);
    };

    Utils.connect_callback = function(connection_id, connection_string) {
      var connection;
      connection = connections[connection_id];
      return connection.connect(connection_id, connection_string);
    };

    Utils.ajax = function(method, action, data, onsuccess, onerror) {
      var xml_http_request;
      xml_http_request = void 0;
      onsuccess = onsuccess != null ? onsuccess : function() {};
      onerror = onerror != null ? onerror : function() {};
      try {
        xml_http_request = new XMLHttpRequest();
      } catch (error) {
        try {
          xml_http_request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (error) {
          try {
            xml_http_request = new ActiveXObject("Msxml2.XMLHTTP");
          } catch (error) {
            tambur.Logger.error("can't use ajax in this browser");
          }
        }
      }
      if (xml_http_request) {
        xml_http_request.open(method, action, true);
        if (data) {
          xml_http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        xml_http_request.onreadystatechange = function() {
          if (xml_http_request.readyState === 4) {
            if (xml_http_request.status === 204 || xml_http_request.status === 200) {
              return onsuccess(xml_http_request.responseText);
            } else {
              return onerror(xml_http_request.responseText);
            }
          }
        };
        if ((data != null) && method === "POST") {
          xml_http_request.send(data);
        } else {
          xml_http_request.send();
        }
        return true;
      } else {
        return false;
      }
    };

    return Utils;

  })();

  namespace = function(target, name, block) {
    var item, top, _i, _len, _ref, _ref1;
    if (arguments.length < 3) {
      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
    }
    top = target;
    _ref1 = name.split('.');
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      item = _ref1[_i];
      target = target[item] || (target[item] = {});
    }
    return block(target, top);
  };

  namespace("tambur", function(exports) {
    exports.Comet = CometSocket;
    exports.Utils = Utils;
    if (window.TAMBUR_FORCE_FLASH) {
      exports.Connection = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args), t = typeof result;
          return t == "object" || t == "function" ? result || child : child;
        })(FlashSocketConnection, args, function(){});
      };
    } else if (window.TAMBUR_FORCE_COMET) {
      exports.Connection = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args), t = typeof result;
          return t == "object" || t == "function" ? result || child : child;
        })(CometSocketConnection, args, function(){});
      };
    } else {
      exports.Connection = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return ConnectionFactory.get_connection.apply(ConnectionFactory, args);
      };
    }
    if (window.TAMBUR_DEBUG) {
      if (window.TAMBUR_LOGGER) {
        return exports.Logger = window.TAMBUR_LOGGER;
      } else if (window.console && window.console.log && window.console.error) {
        return exports.Logger = window.console;
      } else {
        return exports.Logger = {
          log: function() {},
          error: function() {},
          debug: function() {}
        };
      }
    } else {
      return exports.Logger = {
        log: function() {},
        error: function() {},
        debug: function() {}
      };
    }
  });

  if (!window["JSON"]) {
    Utils.fetch_js("json2.min.js");
  }

}).call(this);
