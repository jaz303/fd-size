//
// Smart constructor

module.exports = exports = smartConstructor;
function smartConstructor(width, height) {
    switch (arguments.length) {
        case 0: return zero();
        case 1: return clone(width);
        case 2: return make(width, height);
        default: throw new Error("invalid number of arguments to Size smart constructor");
    }
}

//
// Class

var Size = require('./Size');
exports.Size = Size;

//
// Constructors

exports.zero = zero;
function zero() {
    return new Size(0, 0);
}

exports.clone = clone;
function clone(size) {
    return new Size(size.width, size.height);
}

exports.make = make;
function make(width, height) {
    return new Size(width, height);
}

//
// Operations

exports.eq = function(s1, s2) {
    return s1.width === s2.width && s1.height === s2.height;
}
