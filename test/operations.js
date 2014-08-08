var size = require('..');
var test = require('tape');

function testResult(assert, expected, actual, opts) {
    
    if (Array.isArray(expected)) {
        expected = new size.Size(expected[0], expected[1]);
    }

    if (expected instanceof size.Size) {
        assert.ok(actual instanceof size.Size);
        assert.equal(actual.width, expected.width);
        assert.equal(actual.height, expected.height);
    } else {
        if (opts && opts.inexact) {
            console.log(expected, actual);
            assert.ok(Math.abs(expected - actual) < 0.00001);
        } else {
            assert.ok(expected === actual); 
        }
    }

}

function testObjectMethod(receiver, method, args, expected, opts) {
    test("." + method + "()", function(assert) {
        var actual = receiver[method].apply(receiver, args);
        testResult(assert, expected, actual, opts);
        assert.end();
    });
}

function testSelfMutatingObjectMethod(receiver, method, args, expected, opts) {
    method += '_';
    if (!receiver[method]) {
        return;
    }

    test("." + method + "()", function(assert) {
        receiver[method].apply(receiver, args);
        testResult(assert, expected, receiver, opts);
        assert.end();
    });
}

function testFunctionInterface(receiver, method, args, expected, opts) {
    
    test("size." + method + "()", function(assert) {
        
        args.unshift(receiver);

        if (Array.isArray(expected)) {
            args.push(receiver);
            size[method].apply(null, args);
            testResult(assert, expected, receiver, opts);
        } else {
            var res = size[method].apply(null, args);
            testResult(assert, expected, res, opts);
        }

        assert.end();

    });

}

function testAll(receiver, name, args, result, opts) {

    function mkargs() {
        return args.map(function(a) {
            return Array.isArray(a) ? new size.Size(a[0], a[1]) : a
        });
    }

    testObjectMethod(receiver.clone(), name, mkargs(), result, opts);
    testSelfMutatingObjectMethod(receiver.clone(), name, mkargs(), result, opts);
    testFunctionInterface(receiver.clone(), name, mkargs(), result, opts);
    
}

function testBinaryOperator(name, l, r, result, opts) {
    testAll(
        new size.Size(l[0], l[1]),
        name,
        [Array.isArray(r) ? new size.Size(r[0], r[1]) : r],
        result,
        opts
    );
}

function testUnaryOperator(name, l, result, opts) {
    testAll(
        new size.Size(l[0], l[1]),
        name,
        [],
        result,
        opts
    );
}

test("clone", function(assert) {

    var s1 = new size.Size(13,20);
    var s2 = s1.clone();

    assert.ok(s2 instanceof size.Size);
    assert.ok(s1 !== s2);
    assert.ok(s1.width === s2.width);
    assert.ok(s1.height === s2.height);
    assert.end();

});

testBinaryOperator('eq', [1,2], [1,2], true);
testBinaryOperator('eq', [1,5], [1,8], false);

// TODO: dot