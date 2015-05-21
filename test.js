'use strict';
var assert = require('assert');
var pb = require('./');

it('should throw on invalid input', function () {
	assert.throws(function () { pb('') });
	assert.throws(function () { pb('1') });
	assert.throws(function () { pb(NaN) });
	assert.throws(function () { pb(true) });
});

it('should convert bytes to human readable strings', function () {
	assert.equal(pb(0), '0 B');
	assert.equal(pb(0.4), '0.4 B');
	assert.equal(pb(0.7), '0.7 B');
	assert.equal(pb(10), '10 B');
	assert.equal(pb(10.1), '10.1 B');
	assert.equal(pb(999), '999 B');
	assert.equal(pb(1001), '1 kB');
	assert.equal(pb(1001), '1 kB');
	assert.equal(pb(1e16), '10 PB');
	assert.equal(pb(1e30), '1000000 YB');
});

it('should support negative number', function () {
	assert.equal(pb(-0.4), '-0.4 B');
	assert.equal(pb(-0.7), '-0.7 B');
	assert.equal(pb(-10.1), '-10.1 B');
	assert.equal(pb(-999), '-999 B');
	assert.equal(pb(-1001), '-1 kB');
});

it('should support configurable base', function () {
	var base = 1024;
	assert.equal(pb(2048, base), '2 kB');
	assert.equal(pb(17179900000, base), '16 GB');
});
