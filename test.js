import test from 'ava';
import m from './';

test('throws on invalid input', t => {
	t.throws(() => m(''));
	t.throws(() => m('1'));
	t.throws(() => m(NaN));
	t.throws(() => m(true));
});

test('converts bytes to human readable strings', t => {
	t.is(m(0), '0 B');
	t.is(m(0.4), '0.4 B');
	t.is(m(0.7), '0.7 B');
	t.is(m(10), '10 B');
	t.is(m(10.1), '10.1 B');
	t.is(m(999), '999 B');
	t.is(m(1001), '1 kB');
	t.is(m(1001), '1 kB');
	t.is(m(1e16), '10 PB');
	t.is(m(1e30), '1000000 YB');
});

test('supports negative number', t => {
	t.is(m(-0.4), '-0.4 B');
	t.is(m(-0.7), '-0.7 B');
	t.is(m(-10.1), '-10.1 B');
	t.is(m(-999), '-999 B');
	t.is(m(-1001), '-1 kB');
});
