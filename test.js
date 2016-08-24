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

test('converts bytes to json structure', t => {
	t.deepEqual(fn(0, {json: true}), {num: 0, unit: 'B'});
	t.deepEqual(fn(0.4, {json: true}), {num: 0.4, unit: 'B'});
	t.deepEqual(fn(0.7, {json: true}), {num: 0.7, unit: 'B'});
	t.deepEqual(fn(10, {json: true}), {num: 10, unit: 'B'});
	t.deepEqual(fn(10.1, {json: true}), {num: 10.1, unit: 'B'});
	t.deepEqual(fn(999, {json: true}), {num: 999, unit: 'B'});
	t.deepEqual(fn(1001, {json: true}), {num: 1.001, unit: 'kB'});
	t.deepEqual(fn(1e16, {json: true}), {num: 10, unit: 'PB'});
	t.deepEqual(fn(1e30, {json: true}), {num: 1000000, unit: 'YB'});
});
