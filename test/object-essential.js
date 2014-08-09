var size = require('..');
var test = require('tape');

test("new Size()", function(assert) {
    var s = new size.Size(10, 15);
    assert.equal(s.width, 10);
    assert.equal(s.height, 15);
    assert.end();
});

test("s.clone()", function(assert) {

    var s1 = new size.Size(100, 120);
    var s2 = s1.clone();

    assert.ok(s2 instanceof size.Size);
    assert.ok(s2 !== s1);
    
    assert.equal(s2.width, s1.width);
    assert.equal(s2.height, s2.height);

    assert.end();

});

test("s.eq()", function(assert) {

    var s1 = new size.Size(10, 15);
    var s2 = new size.Size(20, 30);
    var s3 = new size.Size(10, 15);

    assert.ok(s1.eq(s1));
    assert.notOk(s1.eq(s2));
    assert.ok(s1.eq(s3));

    assert.end();

});