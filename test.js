import test from 'ava';
import prettyBytes from './index.js';

test('throws on invalid input', t => {
	t.throws(() => {
		prettyBytes('');
	});

	t.throws(() => {
		prettyBytes('1');
	});

	t.throws(() => {
		prettyBytes(Number.NaN);
	});

	t.throws(() => {
		prettyBytes(true);
	});

	t.throws(() => {
		prettyBytes(Number.POSITIVE_INFINITY);
	});

	t.throws(() => {
		prettyBytes(Number.NEGATIVE_INFINITY);
	});

	t.throws(() => {
		prettyBytes(null);
	});
});

test('converts bytes to human readable strings', t => {
	t.is(prettyBytes(0), '0 B');
	t.is(prettyBytes(0n), '0 B');
	t.is(prettyBytes(0.4), '0.4 B');
	t.is(prettyBytes(0.7), '0.7 B');
	t.is(prettyBytes(10), '10 B');
	t.is(prettyBytes(10n), '10 B');
	t.is(prettyBytes(10.1), '10.1 B');
	t.is(prettyBytes(999), '999 B');
	t.is(prettyBytes(999n), '999 B');
	t.is(prettyBytes(1001), '1 kB');
	t.is(prettyBytes(1001n), '1 kB');
	t.is(prettyBytes(1e16), '10 PB');
	t.is(prettyBytes(10n ** 16n), '10 PB');
	t.is(prettyBytes(1e30), '1000000 YB');
	t.is(prettyBytes(10n ** 30n), '1000000 YB');
	t.is(prettyBytes(827181 * 10e25), '82718100 YB');
});

test('supports negative number', t => {
	t.is(prettyBytes(-0.4), '-0.4 B');
	t.is(prettyBytes(-0.7), '-0.7 B');
	t.is(prettyBytes(-10.1), '-10.1 B');
	t.is(prettyBytes(-999), '-999 B');
	t.is(prettyBytes(-999n), '-999 B');
	t.is(prettyBytes(-1001), '-1 kB');
	t.is(prettyBytes(-1001n), '-1 kB');
});

test('locale option', t => {
	t.is(prettyBytes(-0.4, {locale: 'de'}), '-0,4 B');
	t.is(prettyBytes(0.4, {locale: 'de'}), '0,4 B');
	t.is(prettyBytes(1001, {locale: 'de'}), '1 kB');
	t.is(prettyBytes(1001n, {locale: 'de'}), '1 kB');
	t.is(prettyBytes(10.1, {locale: 'de'}), '10,1 B');
	t.is(prettyBytes(1e30, {locale: 'de'}), '1.000.000 YB');
	t.is(prettyBytes(10n ** 30n, {locale: 'de'}), '1.000.000 YB');
	t.is(prettyBytes(827181 * 10e25, {locale: 'de'}), '82.718.100 YB');

	t.is(prettyBytes(-0.4, {locale: 'en'}), '-0.4 B');
	t.is(prettyBytes(0.4, {locale: 'en'}), '0.4 B');
	t.is(prettyBytes(1001, {locale: 'en'}), '1 kB');
	t.is(prettyBytes(1001n, {locale: 'en'}), '1 kB');
	t.is(prettyBytes(10.1, {locale: 'en'}), '10.1 B');
	t.is(prettyBytes(1e30, {locale: 'en'}), '1,000,000 YB');
	t.is(prettyBytes(10n ** 30n, {locale: 'en'}), '1,000,000 YB');
	t.is(prettyBytes(827181 * 10e25, {locale: 'en'}), '82,718,100 YB');

	t.is(prettyBytes(-0.4, {locale: ['unknown', 'de', 'en']}), '-0,4 B');
	t.is(prettyBytes(0.4, {locale: ['unknown', 'de', 'en']}), '0,4 B');
	t.is(prettyBytes(1001, {locale: ['unknown', 'de', 'en']}), '1 kB');
	t.is(prettyBytes(1001n, {locale: ['unknown', 'de', 'en']}), '1 kB');
	t.is(prettyBytes(10.1, {locale: ['unknown', 'de', 'en']}), '10,1 B');
	t.is(prettyBytes(1e30, {locale: ['unknown', 'de', 'en']}), '1.000.000 YB');
	t.is(prettyBytes(10n ** 30n, {locale: ['unknown', 'de', 'en']}), '1.000.000 YB');
	t.is(prettyBytes(827181 * 10e25, {locale: ['unknown', 'de', 'en']}), '82.718.100 YB');

	t.is(prettyBytes(-0.4, {locale: true}), '-0.4 B');
	t.is(prettyBytes(0.4, {locale: true}), '0.4 B');
	t.is(prettyBytes(1001, {locale: true}), '1 kB');
	t.is(prettyBytes(1001n, {locale: true}), '1 kB');
	t.is(prettyBytes(10.1, {locale: true}), '10.1 B');
	t.is(prettyBytes(1e30, {locale: true}), '1,000,000 YB');
	t.is(prettyBytes(10n ** 30n, {locale: true}), '1,000,000 YB');
	t.is(prettyBytes(827181 * 10e25, {locale: true}), '82,718,100 YB');

	t.is(prettyBytes(-0.4, {locale: false}), '-0.4 B');
	t.is(prettyBytes(0.4, {locale: false}), '0.4 B');
	t.is(prettyBytes(1001, {locale: false}), '1 kB');
	t.is(prettyBytes(1001n, {locale: false}), '1 kB');
	t.is(prettyBytes(10.1, {locale: false}), '10.1 B');
	t.is(prettyBytes(1e30, {locale: false}), '1000000 YB');
	t.is(prettyBytes(10n ** 30n, {locale: false}), '1000000 YB');
	t.is(prettyBytes(827181 * 10e25, {locale: false}), '82718100 YB');

	t.is(prettyBytes(-0.4, {locale: undefined}), '-0.4 B');
	t.is(prettyBytes(0.4, {locale: undefined}), '0.4 B');
	t.is(prettyBytes(1001, {locale: undefined}), '1 kB');
	t.is(prettyBytes(1001n, {locale: undefined}), '1 kB');
	t.is(prettyBytes(10.1, {locale: undefined}), '10.1 B');
	t.is(prettyBytes(1e30, {locale: undefined}), '1000000 YB');
	t.is(prettyBytes(10n ** 30n, {locale: undefined}), '1000000 YB');
	t.is(prettyBytes(827181 * 10e25, {locale: undefined}), '82718100 YB');
});

test('signed option', t => {
	t.is(prettyBytes(42, {signed: true}), '+42 B');
	t.is(prettyBytes(42n, {signed: true}), '+42 B');
	t.is(prettyBytes(-13, {signed: true}), '-13 B');
	t.is(prettyBytes(-13n, {signed: true}), '-13 B');
	t.is(prettyBytes(0, {signed: true}), ' 0 B');
	t.is(prettyBytes(0n, {signed: true}), ' 0 B');
});

test('bits option', t => {
	t.is(prettyBytes(0, {bits: true}), '0 b');
	t.is(prettyBytes(0n, {bits: true}), '0 b');
	t.is(prettyBytes(0.4, {bits: true}), '0.4 b');
	t.is(prettyBytes(0.7, {bits: true}), '0.7 b');
	t.is(prettyBytes(10, {bits: true}), '10 b');
	t.is(prettyBytes(10n, {bits: true}), '10 b');
	t.is(prettyBytes(10.1, {bits: true}), '10.1 b');
	t.is(prettyBytes(999, {bits: true}), '999 b');
	t.is(prettyBytes(999n, {bits: true}), '999 b');
	t.is(prettyBytes(1001, {bits: true}), '1 kbit');
	t.is(prettyBytes(1001n, {bits: true}), '1 kbit');
	t.is(prettyBytes(1e16, {bits: true}), '10 Pbit');
	t.is(prettyBytes(10n ** 16n, {bits: true}), '10 Pbit');
	t.is(prettyBytes(1e30, {bits: true}), '1000000 Ybit');
	t.is(prettyBytes(10n ** 30n, {bits: true}), '1000000 Ybit');
	t.is(prettyBytes(827181 * 10e25, {bits: true}), '82718100 Ybit');
});

test('binary option', t => {
	t.is(prettyBytes(0, {binary: true}), '0 B');
	t.is(prettyBytes(0n, {binary: true}), '0 B');
	t.is(prettyBytes(4, {binary: true}), '4 B');
	t.is(prettyBytes(4n, {binary: true}), '4 B');
	t.is(prettyBytes(10, {binary: true}), '10 B');
	t.is(prettyBytes(10n, {binary: true}), '10 B');
	t.is(prettyBytes(10.1, {binary: true}), '10.1 B');
	t.is(prettyBytes(999, {binary: true}), '999 B');
	t.is(prettyBytes(999n, {binary: true}), '999 B');
	t.is(prettyBytes(1025, {binary: true}), '1 KiB');
	t.is(prettyBytes(1025n, {binary: true}), '1 KiB');
	t.is(prettyBytes(1001, {binary: true}), '1001 B');
	t.is(prettyBytes(1001n, {binary: true}), '1001 B');
	t.is(prettyBytes(1e16, {binary: true}), '8.88 PiB');
	t.is(prettyBytes(10n ** 16n, {binary: true}), '8.88 PiB');
	t.is(prettyBytes(1e30, {binary: true}), '827181 YiB');
	t.is(prettyBytes(10n ** 30n, {binary: true}), '827181 YiB');
});

test('bits and binary option', t => {
	t.is(prettyBytes(0, {bits: true, binary: true}), '0 b');
	t.is(prettyBytes(0n, {bits: true, binary: true}), '0 b');
	t.is(prettyBytes(4, {bits: true, binary: true}), '4 b');
	t.is(prettyBytes(4n, {bits: true, binary: true}), '4 b');
	t.is(prettyBytes(10, {bits: true, binary: true}), '10 b');
	t.is(prettyBytes(10n, {bits: true, binary: true}), '10 b');
	t.is(prettyBytes(999, {bits: true, binary: true}), '999 b');
	t.is(prettyBytes(999n, {bits: true, binary: true}), '999 b');
	t.is(prettyBytes(1025, {bits: true, binary: true}), '1 kibit');
	t.is(prettyBytes(1025n, {bits: true, binary: true}), '1 kibit');
	t.is(prettyBytes(1e6, {bits: true, binary: true}), '977 kibit');
	t.is(prettyBytes(10n ** 6n, {bits: true, binary: true}), '977 kibit');
	t.is(prettyBytes(1e30, {bits: true, binary: true}), '827181 YiB');
	t.is(prettyBytes(10n ** 30n, {bits: true, binary: true}), '827181 YiB');
});

test('fractional digits options', t => {
	t.is(prettyBytes(1900, {maximumFractionDigits: 1}), '1.9 kB');
	t.is(prettyBytes(1900n, {maximumFractionDigits: 1}), '1.9 kB');
	t.is(prettyBytes(1900, {minimumFractionDigits: 3}), '1.900 kB');
	t.is(prettyBytes(1900n, {minimumFractionDigits: 3}), '1.900 kB');
	t.is(prettyBytes(1911, {maximumFractionDigits: 1}), '1.9 kB');
	t.is(prettyBytes(1911n, {maximumFractionDigits: 1}), '1.9 kB');
	t.is(prettyBytes(1111, {maximumFractionDigits: 2}), '1.11 kB');
	t.is(prettyBytes(1111n, {maximumFractionDigits: 2}), '1.11 kB');
	t.is(prettyBytes(1019, {maximumFractionDigits: 3}), '1.019 kB');
	t.is(prettyBytes(1019n, {maximumFractionDigits: 3}), '1.019 kB');
	t.is(prettyBytes(1001, {maximumFractionDigits: 3}), '1.001 kB');
	t.is(prettyBytes(1001n, {maximumFractionDigits: 3}), '1.001 kB');
	t.is(prettyBytes(1000, {minimumFractionDigits: 1, maximumFractionDigits: 3}), '1.0 kB');
	t.is(prettyBytes(1000n, {minimumFractionDigits: 1, maximumFractionDigits: 3}), '1.0 kB');
	t.is(prettyBytes(3942, {minimumFractionDigits: 1, maximumFractionDigits: 2}), '3.94 kB');
	t.is(prettyBytes(3942n, {minimumFractionDigits: 1, maximumFractionDigits: 2}), '3.94 kB');
	t.is.skip(prettyBytes(59_952_784, {maximumFractionDigits: 1}), '59.9 MB'); // eslint-disable-line ava/no-skip-assert
	t.is.skip(prettyBytes(59_952_784, {minimumFractionDigits: 1, maximumFractionDigits: 1}), '59.9 MB'); // eslint-disable-line ava/no-skip-assert
	t.is(prettyBytes(4001, {maximumFractionDigits: 3, binary: true}), '3.907 KiB');
	t.is(prettyBytes(4001n, {maximumFractionDigits: 3, binary: true}), '3.907 KiB');
	t.is(prettyBytes(18_717, {maximumFractionDigits: 2, binary: true}), '18.28 KiB');
	t.is(prettyBytes(18_717n, {maximumFractionDigits: 2, binary: true}), '18.28 KiB');
	t.is(prettyBytes(18_717, {maximumFractionDigits: 4, binary: true}), '18.2783 KiB');
	t.is(prettyBytes(18_717n, {maximumFractionDigits: 4, binary: true}), '18.2783 KiB');
	t.is(prettyBytes(32_768, {minimumFractionDigits: 2, maximumFractionDigits: 3, binary: true}), '32.00 KiB');
	t.is(prettyBytes(32_768n, {minimumFractionDigits: 2, maximumFractionDigits: 3, binary: true}), '32.00 KiB');
	t.is(prettyBytes(65_536, {minimumFractionDigits: 1, maximumFractionDigits: 3, binary: true}), '64.0 KiB');
	t.is(prettyBytes(65_536n, {minimumFractionDigits: 1, maximumFractionDigits: 3, binary: true}), '64.0 KiB');
});

test('space option', t => {
	t.is(prettyBytes(0), '0 B');
	t.is(prettyBytes(0n), '0 B');
	t.is(prettyBytes(0, {space: false}), '0B');
	t.is(prettyBytes(0n, {space: false}), '0B');
	t.is(prettyBytes(999), '999 B');
	t.is(prettyBytes(999n), '999 B');
	t.is(prettyBytes(999, {space: false}), '999B');
	t.is(prettyBytes(999n, {space: false}), '999B');
	t.is(prettyBytes(-13, {signed: true}), '-13 B');
	t.is(prettyBytes(-13n, {signed: true}), '-13 B');
	t.is(prettyBytes(-13, {signed: true, space: false}), '-13B');
	t.is(prettyBytes(-13n, {signed: true, space: false}), '-13B');
	t.is(prettyBytes(42, {signed: true}), '+42 B');
	t.is(prettyBytes(42n, {signed: true}), '+42 B');
	t.is(prettyBytes(42, {signed: true, space: false}), '+42B');
	t.is(prettyBytes(42n, {signed: true, space: false}), '+42B');
});
