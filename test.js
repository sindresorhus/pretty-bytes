import test from 'ava';
import m from '.';

test('throws on invalid input', t => {
	t.throws(() => m(''));
	t.throws(() => m('1'));
	t.throws(() => m(NaN));
	t.throws(() => m(true));
	t.throws(() => m(Infinity));
	t.throws(() => m(-Infinity));
	t.throws(() => m(null));
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

test('locale option', t => {
	t.is(m(-0.4, {locale: 'de'}), '-0,4 B');
	t.is(m(0.4, {locale: 'de'}), '0,4 B');
	t.is(m(1001, {locale: 'de'}), '1 kB');
	t.is(m(10.1, {locale: 'de'}), '10,1 B');
	t.is(m(1e30, {locale: 'de'}), '1.000.000 YB');

	t.is(m(-0.4, {locale: 'en'}), '-0.4 B');
	t.is(m(0.4, {locale: 'en'}), '0.4 B');
	t.is(m(1001, {locale: 'en'}), '1 kB');
	t.is(m(10.1, {locale: 'en'}), '10.1 B');
	t.is(m(1e30, {locale: 'en'}), '1,000,000 YB');

	t.is(m(-0.4, {locale: true}), '-0.4 B');
	t.is(m(0.4, {locale: true}), '0.4 B');
	t.is(m(1001, {locale: true}), '1 kB');
	t.is(m(10.1, {locale: true}), '10.1 B');
	t.is(m(1e30, {locale: true}), '1,000,000 YB');

	t.is(m(-0.4, {locale: false}), '-0.4 B');
	t.is(m(0.4, {locale: false}), '0.4 B');
	t.is(m(1001, {locale: false}), '1 kB');
	t.is(m(10.1, {locale: false}), '10.1 B');
	t.is(m(1e30, {locale: false}), '1000000 YB');

	t.is(m(-0.4, {locale: undefined}), '-0.4 B');
	t.is(m(0.4, {locale: undefined}), '0.4 B');
	t.is(m(1001, {locale: undefined}), '1 kB');
	t.is(m(10.1, {locale: undefined}), '10.1 B');
	t.is(m(1e30, {locale: undefined}), '1000000 YB');
});

test('signed option', t => {
	t.is(m(42, {signed: true}), '+42 B');
	t.is(m(-13, {signed: true}), '-13 B');
	t.is(m(0, {signed: true}), ' 0 B');
});
