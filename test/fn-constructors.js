var size = require('..');
var test = require('tape');

test("zero", function(assert) {
    var v = size.zero();
    assert.equal(v.width, 0);
    assert.equal(v.height, 0);
    assert.end();
});

test("clone", function(assert) {
    var s1 = new size.Size(1.5, 2.5);
    var s2 = size.clone(s1);
    assert.ok(s1 !== s2);
    assert.equal(s1.width, s2.width);
    assert.equal(s1.height, s2.height);
    assert.end();
});

test("make", function(assert) {
    var v = size.make(12.3, 14.6);
    assert.ok(v instanceof size.Size);
    assert.equal(v.width, 12.3);
    assert.equal(v.height, 14.6);
    assert.end();
});

test("smart constructor - 0 args", function(assert) {
    var v = size();
    assert.ok(v instanceof size.Size);
    assert.equal(v.width, 0);
    assert.equal(v.height, 0);
    assert.end();
});

test("smart constructor - 1 arg", function(assert) {
    var s1 = new size.Size(99, 100);
    var s2 = size(s1);
    assert.ok(s2 instanceof size.Size);
    assert.ok(s1 !== s2);
    assert.equal(s1.width, s2.width);
    assert.equal(s1.height, s2.height);
    assert.end();
});

test("smart constructor - 2 args", function(assert) {
    var v = size(15, 23.2);
    assert.ok(v instanceof size.Size);
    assert.equal(v.width, 15);
    assert.equal(v.height, 23.2);
    assert.end();
});