#!/usr/bin/env python
import logging
from webassets import Environment, Bundle
from webassets.script import CommandLineEnvironment
from subprocess import call

def main():
    log = logging.getLogger('webassets')
    log.addHandler(logging.StreamHandler())
    log.setLevel(logging.DEBUG)

    call(["coffee", "-c", "src/tambur.coffee"])
    call(["coffee", "-c", "src/tambur_publisher.coffee"])

    env = Environment('.', '/static')
    jsonjs = Bundle(
            'deps/json2.js', filters='yui_js', output='out/json2.min.js')
    sockjs = Bundle(
            'deps/web_socket.js', filters='yui_js', output='out/web_socket.min.js')
    tamburjs = Bundle(
            'deps/swfobject.js',
            'src/tambur.js', output='out/tambur.js')
    tamburminjs = Bundle(
            'deps/swfobject.js',
            'src/tambur.js', filters='yui_js', output='out/tambur.min.js')
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
