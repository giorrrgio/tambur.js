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

describe("Publisher Publish Test Suite", function() {
    var conn, publisher, subscriber_id;
    beforeEach(function() {
        var success = false;
        conn = tambur.Connection({api_key: api_key, app_id: app_id, no_auto_connect: true});
        publisher = tambur.Publisher(conn, secret);

        tambur.Utils.ajax("GET", "http://wsbot.tambur.io/subscriber_id", false, function(response) {
            subscriber_id = response;
            success = true;
        });
        waitsFor(function() { return success }, "success should be true", 2000);
    });

    var publish = function(stream, imsg, ssl) {
        var success = false;
        runs(function() {
            var handle = generate_handle();
            var msg = {handle: handle, msg: imsg};
            var json_msg = JSON.stringify(msg);
            publisher.connection.ssl = ssl;
            expect(publisher.publish(stream, json_msg)).toBe(true);
            setTimeout(function() {
                tambur.Utils.ajax("GET", "http://wsbot.tambur.io/results?handle="+handle, false, function(response) {
                    results = JSON.parse(response);
                    expect(results.length).toBe(1);
                    if (stream.indexOf("private") === 0) {
                        expect(results[0][handle]).toEqual({'private' : msg});
                    } else {
                        var res = {};
                        res[stream] = msg;
                        expect(results[0][handle]).toEqual(res);
                    }
                    success = true;
                });
            }, 2000);
        });
        waitsFor(function() { return success }, "success should be true", 4000);
        return true;
    }
    it("check publish", function() {
        expect(publish("test", "test message")).toBe(true);
        expect(publish("test", "test message", true)).toBe(true);
    });
    it("check auth publish", function() {
        expect(publish("auth:test", "test message")).toBe(true);
        expect(publish("auth:test", "test message", true)).toBe(true);
    });
    it("check private publish", function() {
        expect(publish("private:"+subscriber_id, "test message")).toBe(true);
        expect(publish("private:"+subscriber_id, "test message", true)).toBe(true);
    });

    afterEach(function() {
        conn.close();
    });

});

describe("Publisher Mode Token Test Suite", function() {
    var conn, publisher, stream = "test", user = "test_user";
    beforeEach(function() {
        /* hardcode stuff so we use the same values in all our publisher clients */
        conn = tambur.Connection({api_key: "30af96de47e3c58329045ff136a4a3ea", app_id: "ws-bot-1", no_auto_connect: true});
        conn.subscriber_id = "a0629978-28d8-4fd4-b862-f67e9b6dfd8f";
        publisher = tambur.Publisher(conn, "wsbot");
    });
    it("check generate auth token", function() {
        expect(publisher.generate_auth_token(stream)).toEqual("2f25ad1ce5afab906cc582b6254a912590c60f73");
    });
    it("check generate presence token", function() {
        expect(publisher.generate_presence_token(stream, user)).toEqual("dcadf9659116ebbe024a4cd5ae12bde48d95408e");
    });
    it("check generate direct token", function() {
        expect(publisher.generate_direct_token(stream, user)).toEqual("2403374744295f5d22e3f999d4eb85b3f689c6b2");
    });
    afterEach(function() {conn.close()});
});

