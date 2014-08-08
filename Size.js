module.exports = Size;

function Size(width, height) {
	this.width = width;
	this.height = height;
}

//
// Clone

Size.prototype.clone = function() {
	return new Size(this.width, this.height);
}

//
// Operations

Size.prototype.eq = function(rhs) {
	return this.width === rhs.width && this.height === rhs.height;
}