import test from 'ava';
import prettyBytes from '.';

test('throws on invalid input', t => {
	t.throws(() => prettyBytes(''));
	t.throws(() => prettyBytes('1'));
	t.throws(() => prettyBytes(NaN));
	t.throws(() => prettyBytes(true));
	t.throws(() => prettyBytes(Infinity));
	t.throws(() => prettyBytes(-Infinity));
	t.throws(() => prettyBytes(null));
});

test('converts bytes to human readable strings', t => {
	t.is(prettyBytes(0), '0 B');
	t.is(prettyBytes(0.4), '0.4 B');
	t.is(prettyBytes(0.7), '0.7 B');
	t.is(prettyBytes(10), '10 B');
	t.is(prettyBytes(10.1), '10.1 B');
	t.is(prettyBytes(999), '999 B');
	t.is(prettyBytes(1001), '1 kB');
	t.is(prettyBytes(1001), '1 kB');
	t.is(prettyBytes(1e16), '10 PB');
	t.is(prettyBytes(1e30), '1000000 YB');
});

test('supports negative number', t => {
	t.is(prettyBytes(-0.4), '-0.4 B');
	t.is(prettyBytes(-0.7), '-0.7 B');
	t.is(prettyBytes(-10.1), '-10.1 B');
	t.is(prettyBytes(-999), '-999 B');
	t.is(prettyBytes(-1001), '-1 kB');
});

test('locale option', t => {
	t.is(prettyBytes(-0.4, {locale: 'de'}), '-0,4 B');
	t.is(prettyBytes(0.4, {locale: 'de'}), '0,4 B');
	t.is(prettyBytes(1001, {locale: 'de'}), '1 kB');
	t.is(prettyBytes(10.1, {locale: 'de'}), '10,1 B');
	t.is(prettyBytes(1e30, {locale: 'de'}), '1.000.000 YB');

	t.is(prettyBytes(-0.4, {locale: 'en'}), '-0.4 B');
	t.is(prettyBytes(0.4, {locale: 'en'}), '0.4 B');
	t.is(prettyBytes(1001, {locale: 'en'}), '1 kB');
	t.is(prettyBytes(10.1, {locale: 'en'}), '10.1 B');
	t.is(prettyBytes(1e30, {locale: 'en'}), '1,000,000 YB');

	t.is(prettyBytes(-0.4, {locale: true}), '-0.4 B');
	t.is(prettyBytes(0.4, {locale: true}), '0.4 B');
	t.is(prettyBytes(1001, {locale: true}), '1 kB');
	t.is(prettyBytes(10.1, {locale: true}), '10.1 B');
	t.is(prettyBytes(1e30, {locale: true}), '1,000,000 YB');

	t.is(prettyBytes(-0.4, {locale: false}), '-0.4 B');
	t.is(prettyBytes(0.4, {locale: false}), '0.4 B');
	t.is(prettyBytes(1001, {locale: false}), '1 kB');
	t.is(prettyBytes(10.1, {locale: false}), '10.1 B');
	t.is(prettyBytes(1e30, {locale: false}), '1000000 YB');

	t.is(prettyBytes(-0.4, {locale: undefined}), '-0.4 B');
	t.is(prettyBytes(0.4, {locale: undefined}), '0.4 B');
	t.is(prettyBytes(1001, {locale: undefined}), '1 kB');
	t.is(prettyBytes(10.1, {locale: undefined}), '10.1 B');
	t.is(prettyBytes(1e30, {locale: undefined}), '1000000 YB');
});

test('signed option', t => {
	t.is(prettyBytes(42, {signed: true}), '+42 B');
	t.is(prettyBytes(-13, {signed: true}), '-13 B');
	t.is(prettyBytes(0, {signed: true}), ' 0 B');
});

test('bits option', t => {
	t.is(prettyBytes(0, {bits: true}), '0 b');
	t.is(prettyBytes(0.4, {bits: true}), '0.4 b');
	t.is(prettyBytes(0.7, {bits: true}), '0.7 b');
	t.is(prettyBytes(10, {bits: true}), '10 b');
	t.is(prettyBytes(10.1, {bits: true}), '10.1 b');
	t.is(prettyBytes(999, {bits: true}), '999 b');
	t.is(prettyBytes(1001, {bits: true}), '1 kbit');
	t.is(prettyBytes(1001, {bits: true}), '1 kbit');
	t.is(prettyBytes(1e16, {bits: true}), '10 Pbit');
	t.is(prettyBytes(1e30, {bits: true}), '1000000 Ybit');
});
