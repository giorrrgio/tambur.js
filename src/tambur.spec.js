TAMBUR_DEBUG = false;
TAMBUR_LOGGER = {
    log: function(msg) {console.log("log", msg)},
    debug: function(msg) {console.log("debug", msg)},
    error: function(msg) {console.log("error", msg)}
};

function generate_handle() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
};
/* IMPORTANT this suite initializes the credentials used for all other tests */
describe("init testing", function() {
    var success = false;
    it("init", function() {
        tambur.Utils.ajax("GET", "http://wsbot.tambur.io/credentials", false, function(response) {
            response = JSON.parse(response);
            api_key = response.api_key;
            app_id = response.app_id;
            secret = response.secret;
            success = true;
        });
        waitsFor(function() { return success }, "success should be true", 2000);
    });
});

describe("WebSocket Connection Test Suite", function() {
    describe("Connection Constructor Test", function() {
        var conn;
        it("check that ARGS constructor works 1", function() {
            var success = false
            runs(function() {
                conn = tambur.Connection(api_key, app_id, false, function() { success = true });
            });
            waitsFor(function() { return success }, "success should be true", 2000);
            runs(function() {
                expect(success).toBe(true);
            });
        });
        it("check that ARGS constructor works 2", function() {
            var success = false
            runs(function() {
                conn = tambur.Connection(api_key, app_id);
                conn.ready = function() { success = true };
            });
            waitsFor(function() { return success }, "success should be true", 2000);
            runs(function() {
                expect(success).toBe(true);
            });
        });
        it("check that DICT constructor works 1", function() {
            var success = false
            runs(function() {
                conn = tambur.Connection({api_key: api_key, app_id: app_id, ready: function() { success = true }});
            });
            waitsFor(function() { return success }, "success should be true", 2000);
            runs(function() {
                expect(success).toBe(true);
            });
        });
        it("check that DICT constructor works 2", function() {
            var success = false
            runs(function() {
                conn = tambur.Connection({api_key: api_key, app_id: app_id});
                conn.ready = function() { success = true };
            });
            waitsFor(function() { return success }, "success should be true", 2000);
            runs(function() {
                expect(success).toBe(true);
            });
        });
        it("check that close/reopen works", function() {
            var closed = false;

            runs(function() {
                conn = tambur.Connection({api_key: api_key, app_id: app_id});
                conn.ready = function() { conn.close() };
                conn.onclose = function() { closed = true };
            });
            waitsFor(function() { return closed }, "closed should be true", 2000);
            runs(function() {
                expect(closed).toBe(true);
            });
            var open = false;
            runs(function() {
                conn.reopen();
                conn.ready = function() { open = true };
            });
            waitsFor(function() { return open }, "open should be true", 2000);
            runs(function() {
                expect(open).toBe(true);
            });
        });

        it("check that ssl works", function() {
            var success = false
            runs(function() {
                conn = tambur.Connection({api_key: api_key, app_id: app_id, ssl: true, ready: function() { success = true }});
            });
            waitsFor(function() { return success }, "success should be true", 2000);
            runs(function() {
                expect(success).toBe(true);
            });
        });

        afterEach(function() {
            conn.close();
        });
    });
    describe("Subscription Tests", function() {
        var conn;
        it("check that waiting cmds are working", function() {
            var success = false
            conn = tambur.Connection(api_key, app_id);
            runs(function() {
                var stream = conn.get_stream("test");
                stream.ready = function() { success = true };
            });
            waitsFor(function() { return success }, "success should be true", 2000);
            runs(function() {
                expect(success).toBe(true);
            });
        });
        it("check that non-waiting cmds are working", function() {
            var success = false
            conn = tambur.Connection(api_key, app_id);
            conn.ready = function() {
                var stream = conn.get_stream("test");
                stream.ready = function() { success = true};
            };
            waitsFor(function() { return success }, "success should be true", 2000);
            runs(function() {
                expect(success).toBe(true);
            });
        });

        it("check stream exceptions", function() {
            var stream, success = false
            conn = tambur.Connection(api_key, app_id);
            conn.ready = function() {
                stream = conn.get_stream("test");
                stream.ready = function() { success = true};
            };
            waitsFor(function() { return success }, "success should be true", 2000);
            runs(function() {
                var reopen = function() {
                    stream.reopen();
                };
                var reclose = function() {
                    stream.close();
                };
                expect(success).toBe(true);
                expect(reopen).toThrow();
                stream.close();
                waitsFor(function() { return stream.active == false }, "stream should be inactive", 2000);
                runs(function() {
                    expect(reclose).toThrow();
                });
            });
        });

        it("check streams are subscribed after a reconnect", function() {
            var success = false
            conn = tambur.Connection(api_key, app_id);
            var stream = conn.get_stream("test");
            stream.ready = function() {
                conn.close();
                success = true;
            }
            waitsFor(function() { return success}, "success should be true", 2000);
            runs(function() {
                expect(success).toBe(true);
                success = false;
                conn.reopen();
                stream.ready = function() {
                    success = true;
                };
            });
            waitsFor(function() { return success}, "success should be true", 2000);
            runs(function() {
                expect(success).toBe(true);
            });
        });
        afterEach(function() {
            conn.close();
        });
    });
});

describe("Stream Test suite", function() {
    var publisher, conn;
    beforeEach(function() {
        var success = false;
        conn = tambur.Connection({api_key: api_key, app_id: app_id});
        conn.ready = function() {
            publisher = tambur.Publisher(conn, secret);
            success = true;
        };
        waitsFor(function() { return success }, "success should be true", 2000);
        runs(function(){
            expect(success).toBe(true);
        });
    });
    afterEach(function() {
        conn.close();
        publisher = undefined;
        conn = undefined;
    });

    describe("Common Streams", function() {
        var stream, ready = false, messages = {};
        beforeEach(function() {
            stream = conn.get_stream("common_test");
            stream.onmessage = function(message) {
                var msg = JSON.parse(message);
                messages[msg.handle] = true;
            };
            stream.ready = function() { ready = true; }
            waitsFor(function() { return ready }, "ready should be true", 2000);
        });

        it("receive test", function() {
            var handle = generate_handle();
            expect(publisher.publish("common_test", JSON.stringify({handle: handle}))).toBe(true);
            waitsFor(function() { return messages[handle]}, "message should be delivered", 2000);
            runs(function() {
                expect(messages[handle]).toBe(true);
            });
        });
    });

    describe("Private Streams", function() {
        var stream, ready = false, messages = {};
        beforeEach(function() {
            stream = conn.get_stream("private");
            stream.onmessage = function(message) {
                var msg = JSON.parse(message);
                messages[msg.handle] = true;
            };
        });

        it("receive test", function() {
            var handle = generate_handle();
            expect(publisher.publish("private", JSON.stringify({handle: handle}))).toBe(true);
            waitsFor(function() { return messages[handle]}, "message should be delivered", 2000);
            runs(function() {
                expect(messages[handle]).toBe(true);
            });
        });
    });

    describe("Stream Modes Test Suite", function() {
        it("receive test", function() {
            var stream, ready = false, messages = {};
            var success = false, ready = false, handle = generate_handle();
            stream = conn.get_stream("auth_test");
            stream.ready = function() {
                ready = true;
            };
            waitsFor(function() { return ready }, "ready should be delivered", 2000);
            runs(function() {
                stream.enable_auth(publisher.generate_auth_token("auth_test"));
                stream.onenabled = function(mode) {
                    success = mode === "auth";
                };
                stream.onauth = function(message) {
                    var msg = JSON.parse(message);
                    messages[msg.handle] = true;
                };
            });
            waitsFor(function() { return success}, "success should be delivered", 2000);
            runs(function() {
                expect(publisher.publish("auth:auth_test", JSON.stringify({handle: handle}))).toBe(true);
            });
            waitsFor(function() { return messages[handle]}, "message should be delivered", 2000);
            runs(function() {
                expect(messages[handle]).toBe(true);
            });
        });

        it("presence event test", function() {
            var stream, messages = {};
            var success = false, ready1 = false, present1 = false, present2 = false;
            stream = conn.get_stream("presence_test");
            stream.ready = function() {
                ready1 = true;
            };
            waitsFor(function() { return ready1 }, "ready should be true", 2000);
            runs(function() {
                stream.enable_presence("test_user1", publisher.generate_presence_token("presence_test", "test_user1"));
                stream.onenabled = function(mode) {
                    success = mode === "presence";
                };
                stream.onpresence = function(message) {
                    var user = message[0];
                    var state = message[1];
                    present1 = (user === "test_user2" && state === "up");
                };
            });
            waitsFor(function() { return success }, "success should be true", 2000);
            runs(function() {
                var c = tambur.Connection(conn.api_key, conn.app_id);
                c.ready = function() {
                    var s = c.get_stream("presence_test");
                    s.ready = function() {
                        var p = tambur.Publisher(c, publisher.secret);
                        s.enable_presence("test_user2", p.generate_presence_token("presence_test", "test_user2"));
                    };
                    s.onpresence = function(message) {
                            var user = message[0];
                            var state = message[1];
                            present2 = (user ==="test_user1" && state === "down");
                    };
                };
            });
            waitsFor(function() { return present1}, "first stream should get a presence up", 2000);
            runs(function() {
                // disable presence of first stream (send down event)
                stream.disable_presence();
            });
            waitsFor(function() { return (present2)}, "second stream should get a presence down", 2000);
            runs(function() {
                expect(present1 && present2).toBe(true);
            });
        });

        it("direct msg test", function() {
            var stream, messages = {};
            var success = false, ready1 = false, msg1 = false;
            stream = conn.get_stream("direct_test");
            stream.ready = function() {
                ready1 = true;
            };
            waitsFor(function() { return ready1 }, "ready should be true", 2000);
            runs(function() {
                stream.enable_direct("test_user1", publisher.generate_direct_token("direct_test", "test_user1"));
                stream.onenabled = function(mode) {
                    success = mode === "direct";
                };
                stream.ondirect = function(message) {
                    var user = message[0];
                    var msg = message[1];
                    msg1 = (user === "test_user2" && msg === "hello");
                };
            });
            waitsFor(function() { return success }, "success should be true", 2000);
            runs(function() {
                var c = tambur.Connection(conn.api_key, conn.app_id);
                c.ready = function() {
                    var s = c.get_stream("direct_test");
                    s.ready = function() {
                        var p = tambur.Publisher(c, publisher.secret);
                        s.enable_direct("test_user2", p.generate_direct_token("direct_test", "test_user2"));
                    };
                    s.onenabled = function(mode) {
                        s.direct_msg("test_user1", "hello");
                    };
                };
            });
            waitsFor(function() { return msg1}, "first stream should get a presence up", 2000);
            runs(function() {
                expect(msg1).toBe(true);
            });
        });

        it("check mode already enabled exception", function() {
            var enabled_counter = 0, disabled_counter = 0, stream, ready = false, messages = {};
            var enable_auth = function() { stream.enable_auth(publisher.generate_auth_token("exceptions_test"))};
            var enable_presence = function() {stream.enable_presence("exception_tester", publisher.generate_presence_token("exceptions_test", "exception_tester"))};
            var enable_direct = function() {stream.enable_direct("exception_tester", publisher.generate_direct_token("exceptions_test", "exception_tester"))};
            var disable_auth = function() { stream.disable_auth()};
            var disable_presence = function() { stream.disable_presence()};
            var disable_direct = function() { stream.disable_direct()};
            stream = conn.get_stream("exceptions_test");
            stream.onenabled = function(mode) {
                enabled_counter += 1;
            };
            stream.ondisabled = function(mode) {
                disabled_counter += 1;
            };
            stream.ready = function() {
                expect(enable_auth).not.toThrow();
                expect(enable_presence).not.toThrow();
                expect(enable_direct).not.toThrow();
            };

            waitsFor(function() {return enabled_counter == 3}, "enabled_counter should be 3", 2000);
            runs(function() {
                expect(enable_auth).toThrow();
                expect(enable_presence).toThrow();
                expect(enable_direct).toThrow();
                // disable modes
                expect(disable_auth).not.toThrow();
                expect(disable_presence).not.toThrow();
                expect(disable_direct).not.toThrow();
            });
            waitsFor(function() {return disabled_counter == 3}, "disabled_coutner should be 3", 2000);
            runs(function() {
                expect(disable_auth).toThrow();
                expect(disable_presence).toThrow();
                expect(disable_direct).toThrow();
            });
        });
    });
});
