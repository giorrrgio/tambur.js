#tambur.js

Include the following script element on your website.
```html
<script src="http://tamburio.github.com/tambur.js/out/tambur.min.js"></script>
```
##Connection
At first you must to get a new connection to our servers:
```javascript
var conn = new tambur.Connection(MY_API_KEY, MY_APP_ID);
// or if you prefer the hash based constructor
var conn = new tambur.Connection({
    api_key : MY_API_KEY,
    app_id : MY_APP_ID,

    // you can also provide other options here such as:

    ready : function () {},   // a callback that is fired when the connection is up
    ssl : true,               // enforcing ssl (default false)
    max_retires : 10,         // nr of maximal re-connects (default 10)
});
```
Behind the scene we will now check your browser for its HTML5 WebSocket support. If WebSockets aren't supported we fallback to Flash sockets and automatically fetch the required Javascript resources as well as the swf-files. 

Once your connection is ready you can start subscribing to any stream you like.

##Streams
Subscribing to a stream is as easy as

```javascript
var stream = conn.get_stream("my_stream_name");
```

If you are interested in when your stream is ready (usually within milliseconds) you can provide a ready callback:

```javascript
stream.ready = function() {
    alert("I am ready");
};
```

However, that is most of the time not really necessary. It is more important that you can process the messages being published in your stream. It is as easy as:

```javascript
stream.onmessage = function(msg) {
    /* do some fancy things with your msg */
};
```

If you don't need the messages anymore, just call
```javascript    
stream.close();
```

You can always reopen the stream with:
```javascript    
stream.reopen();
```

####IMPORTANT
We always cache the stream, so a call to <code>conn.get_stream("MY_STREAM")</code> twice will return the same stream object, which might be open or closed. So if you are closing your stream with <code>stream.close()</code> and later want to open the same stream again you must do that with <code>stream.reopen()</code>, and not using <code>conn.get_stream("MY_STREAM")</code>. You can always check the boolean property <code>stream.active</code> for whether you must reopen the stream or not. 

###Modes
Your streams can have none, one or several modes enabled. Such modes are <b>Authentication-Mode</b>, <b>Presence-Mode</b>, and <b>Direct-Mode</b>. In order to enable such a mode your browser client must ask the web application for permission. The permission is just a token specific to the stream, mode, and your unique subscriber id. The server libraries we provide do usually contain the necessary functions for generating these tokens. 

####Authentication Mode
The Authentication Mode allows a publisher to send specific messages to all the subscribers of a stream that have been previously authenticated by your web application.
```javascript    
stream.enable_auth(auth_token);
```

Disabling the auth_mode is as simple as:

```javascript    
stream.disable_auth();
```

In order to process all the authenticated messages you must set the <code>stream.onauth</code> callback properly. 

```javascript    
stream.onauth = function(msg) {
    /* do some fancy things with your auth message */
};
```

####Presence Mode
The Presence Mode will allow you to get informed about other subscribers joining and leaving the stream. You will only get informed about subscribers also having the presence mode enabled.
In order to enable this mode you must select a user_name which will be sent together with your presence status to all the other subscribers.

```javascript    
stream.enable_presence(your_user_name, presence_token);
```

Disabling presence is as easy as:

```javascript    
stream.disable_presence();
```

In order to process all the presence notifications you must set the <code>stream.onpresence</code> callback properly. 

```javascript    
stream.onpresence = function(notification) {
    var user =  notification[0];     // the username configured by the other subscriber
    var status = notification[1];   // the presence status, either "up" or "down"

    /* do some fancy things with your presence notification */
};
```

####Direct Mode
The Direct Mode will allow you to send direct messages to other users subscribed to the stream. 
In order to enable this mode you must select a user_name. (it makes sense to use the same name as the one used for the presence mode, but that is not MUST)

```javascript    
stream.enable_direct(your_user_name, direct_token);
```

Disabling direct messaging is as easy as:

```javascript    
stream.disable_direct();
```

In order to process all the direct messages you must set the <code>stream.ondirect</code> callback properly. 

```javascript    
stream.ondirect = function(direct_message) {
    var sender =  direct_message[0];     // the username configured by the other subscriber
    var message = direct_message[1];   // the message text 

    /* do some fancy things with your direct message */
};
```

While receiving direct messages is cool, you also want to send them to other users subscribed to the stream.

```javascript    
stream.direct_msg("bob", "hi bob, how are you doing?");
```

This call will always work, even if no user "bob" has subscribed. It probably make sense to use direct mode together with the presence mode.

##Publisher
Since you don't want to use the tambur.js Publisher interface in production we don't bundle it together with the tambur.min.js or tambur.js. That's why you must add another script element to your website.
```html
<script src="http://tamburio.github.com/tambur.js/out/tambur_pub.min.js"></script>
```

Using this Publish interface is only recommended for debugging and/or testing.
```javascript
var conn = new tambur.Connection(MY_API_KEY, MY_APP_ID);
var publisher = new tambur.Publisher(conn, MY_APP_SECRET);
```

###Publish
    
```javascript    
publisher.publish("SOME_STREAM", "SOME MESSAGE");
```

or if you want to use it for debugging purpose:

```javascript    
publisher.publish("SOME_STREAM", "SOME MESSAGE", true);
```

this will show you the debug output of the validation process within the Tambur.io Web Application.

###Generate Mode Tokens
A mode token is a SHA1 hash over a string containing Api-Key, App-Id, Mode, SubscriberId, and some Mode specific parameters. Since the Publisher Instance contains a reference to the connection it already knows Api-Key, App-Id and the SubscriberId for this particular connection. So for now you can only generate mode tokens for your own connection. (probably if you are using this <b>unrecommended</b> Publisher interface you also know how to tweak it in order to support other SubscriberIds.

####Auth Mode

```javascript    
publisher.generate_auth_token("SOME_STREAM");
```

####Presence Mode

```javascript    
publisher.generate_presence_token("SOME_STREAM", "USER_NAME");
```

####Direct Mode

```javascript    
publisher.generate_direct_token("SOME_STREAM", "USER_NAME");
```

##License (MIT)
Copyright (c) \<2012\> \<Tambur.io\>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

##License Dependencies
web_socket.js : http://www.opensource.org/licenses/BSD-3-Clause

swfobject.js : http://www.opensource.org/licenses/MIT

sha1.js : http://www.opensource.org/licenses/BSD-2-Clause

oauth.js : http://www.opensource.org/licenses/Apache-2.0
