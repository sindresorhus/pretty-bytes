import test from 'ava';
import fn from './';

test('throws on invalid input', t => {
	t.throws(() => fn(''));
	t.throws(() => fn('1'));
	t.throws(() => fn(NaN));
	t.throws(() => fn(true));
});

test('converts bytes to human readable strings', t => {
	t.is(fn(0), '0 B');
	t.is(fn(0.4), '0.4 B');
	t.is(fn(0.7), '0.7 B');
	t.is(fn(10), '10 B');
	t.is(fn(10.1), '10.1 B');
	t.is(fn(999), '999 B');
	t.is(fn(1001), '1 kB');
	t.is(fn(1001), '1 kB');
	t.is(fn(1e16), '10 PB');
	t.is(fn(1e30), '1000000 YB');
});

test('supports negative number', t => {
	t.is(fn(-0.4), '-0.4 B');
	t.is(fn(-0.7), '-0.7 B');
	t.is(fn(-10.1), '-10.1 B');
	t.is(fn(-999), '-999 B');
	t.is(fn(-1001), '-1 kB');
});
