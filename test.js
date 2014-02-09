'use strict';
var assert = require('assert');
var pb = require('./pretty-bytes');

it('should throw on invalid input', function () {
	assert.throws(function () { pb('') });
	assert.throws(function () { pb('1') });
	assert.throws(function () { pb(NaN) });
	assert.throws(function () { pb(true) });
});

it('should convert bytes to human readable strings', function () {
	assert.equal(pb(0), '0 B');
	assert.equal(pb(10), '10 B');
	assert.equal(pb(999), '999 B');
	assert.equal(pb(1001), '1 kB');
	assert.equal(pb(1001), '1 kB');
	assert.equal(pb(9999999999999999), '10 PB');
});

it('should support negative number', function () {
	assert.equal(pb(-999), '-999 B');
});
