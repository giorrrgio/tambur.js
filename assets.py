#!/usr/bin/env python
import logging
from webassets import Environment, Bundle
from webassets.script import CommandLineEnvironment

def main():
    log = logging.getLogger('webassets')
    log.addHandler(logging.StreamHandler())
    log.setLevel(logging.DEBUG)

    env = Environment('.', '/static')
    jsonjs = Bundle(
            'deps/json2.js', filters='yui_js', output='out/json2.min.js')
    sockjs = Bundle(
            'deps/web_socket.js', filters='yui_js', output='out/web_socket.min.js')
    tamburjs = Bundle(
            'deps/swfobject.js',
            'src/tambur_comet_fallback.js',
            'src/tambur_connection.js',
            'src/tambur_logger.js',
            'src/tambur_utils.js',
            'src/tambur_stream.js', output='out/tambur.js')
    tamburminjs = Bundle(
            'deps/swfobject.js',
            'src/tambur_comet_fallback.js',
            'src/tambur_connection.js',
            'src/tambur_logger.js',
            'src/tambur_utils.js',
            'src/tambur_stream.js', filters='yui_js', output='out/tambur.min.js')
    publishjs = Bundle(
            'deps/sha1.js',
            'deps/oauth.js',
            'src/tambur_publisher.js', output='out/tambur_pub.js')
    publishminjs = Bundle(
            'deps/sha1.js',
            'deps/oauth.js',
            'src/tambur_publisher.js', filters='yui_js', output='out/tambur_pub.min.js')
    env.register('tambur.js', tamburjs)
    env.register('tambur.min.js', tamburminjs)
    env.register('tambur_pub.js', publishjs)
    env.register('tambur_pub.min.js', publishminjs)
    env.register('json2.js', jsonjs)
    env.register('web_socket.js', sockjs)
    cmdenv = CommandLineEnvironment(env, log)
    cmdenv.build()

if __name__ == '__main__':
    main()
