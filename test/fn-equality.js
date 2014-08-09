var test = require('tape');
var size = require('..');

test("size.eq()", function(assert) {

    var s1 = size(10, 15);
    var s2 = size(20, 30);
    var s3 = size(10, 15);

    assert.ok(size.eq(s1, s1));
    assert.notOk(size.eq(s1, s2));
    assert.ok(size.eq(s1, s3));

    assert.end();

});