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
	if (Number(process.version[0]) >= 14) {
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

		t.is(prettyBytes(-0.4, {locale: ['unknown', 'de', 'en']}), '-0,4 B');
		t.is(prettyBytes(0.4, {locale: ['unknown', 'de', 'en']}), '0,4 B');
		t.is(prettyBytes(1001, {locale: ['unknown', 'de', 'en']}), '1 kB');
		t.is(prettyBytes(10.1, {locale: ['unknown', 'de', 'en']}), '10,1 B');
		t.is(prettyBytes(1e30, {locale: ['unknown', 'de', 'en']}), '1.000.000 YB');

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
	} else {
		t.pass();
	}
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

test('binary option', t => {
	t.is(prettyBytes(0, {binary: true}), '0 B');
	t.is(prettyBytes(4, {binary: true}), '4 B');
	t.is(prettyBytes(10, {binary: true}), '10 B');
	t.is(prettyBytes(10.1, {binary: true}), '10.1 B');
	t.is(prettyBytes(999, {binary: true}), '999 B');
	t.is(prettyBytes(1025, {binary: true}), '1 kiB');
	t.is(prettyBytes(1001, {binary: true}), '1000 B');
	t.is(prettyBytes(1e16, {binary: true}), '8.88 PiB');
	t.is(prettyBytes(1e30, {binary: true}), '827000 YiB');
});

test('bits and binary option', t => {
	t.is(prettyBytes(0, {bits: true, binary: true}), '0 b');
	t.is(prettyBytes(4, {bits: true, binary: true}), '4 b');
	t.is(prettyBytes(10, {bits: true, binary: true}), '10 b');
	t.is(prettyBytes(999, {bits: true, binary: true}), '999 b');
	t.is(prettyBytes(1025, {bits: true, binary: true}), '1 kibit');
	t.is(prettyBytes(1e6, {bits: true, binary: true}), '977 kibit');
});

test('fractional digits options', t => {
	t.is(prettyBytes(1900, {maximumFractionDigits: 1}), '1.9 kB');
	t.is(prettyBytes(1900, {minimumFractionDigits: 3}), '1.900 kB');
	t.is(prettyBytes(1911, {maximumFractionDigits: 1}), '1.9 kB');
	t.is(prettyBytes(1111, {maximumFractionDigits: 2}), '1.11 kB');
	t.is(prettyBytes(1019, {maximumFractionDigits: 3}), '1.019 kB');
	t.is(prettyBytes(1001, {maximumFractionDigits: 3}), '1.001 kB');
	t.is(prettyBytes(1000, {minimumFractionDigits: 1, maximumFractionDigits: 3}), '1.0 kB');
	t.is(prettyBytes(3942, {minimumFractionDigits: 1, maximumFractionDigits: 2}), '3.94 kB');
	t.is.skip(prettyBytes(59952784, {maximumFractionDigits: 1}), '59.9 MB'); // eslint-disable-line ava/no-skip-assert
	t.is.skip(prettyBytes(59952784, {minimumFractionDigits: 1, maximumFractionDigits: 1}), '59.9 MB'); // eslint-disable-line ava/no-skip-assert
	t.is(prettyBytes(4001, {maximumFractionDigits: 3, binary: true}), '3.907 kiB');
	t.is(prettyBytes(18717, {maximumFractionDigits: 2, binary: true}), '18.28 kiB');
	t.is(prettyBytes(18717, {maximumFractionDigits: 4, binary: true}), '18.2783 kiB');
	t.is(prettyBytes(32768, {minimumFractionDigits: 2, maximumFractionDigits: 3, binary: true}), '32.00 kiB');
	t.is(prettyBytes(65536, {minimumFractionDigits: 1, maximumFractionDigits: 3, binary: true}), '64.0 kiB');
});
