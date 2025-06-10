import test from 'ava';
import prettyBytes from './index.js';

// Unit transition boundary tests
test('unit transition boundary tests', t => {
	// Bytes to kilobytes boundary (1000 vs 1001)
	t.is(prettyBytes(999), '999 B');
	t.is(prettyBytes(1000), '1 kB');
	t.is(prettyBytes(1001), '1 kB');

	// Kilobytes to megabytes transition
	t.is(prettyBytes(999_000), '999 kB');
	t.is(prettyBytes(1_000_000), '1 MB');
	t.is(prettyBytes(1_000_001), '1 MB');

	// Megabytes to gigabytes transition
	t.is(prettyBytes(999_000_000), '999 MB');
	t.is(prettyBytes(1_000_000_000), '1 GB');
	t.is(prettyBytes(1_000_000_001), '1 GB');

	// Binary unit transitions (1024 boundaries)
	t.is(prettyBytes(1023, {binary: true}), '1020 B');
	t.is(prettyBytes(1024, {binary: true}), '1 KiB');
	t.is(prettyBytes(1025, {binary: true}), '1 KiB');

	// KiB to MiB transition
	t.is(prettyBytes(1_048_575, {binary: true}), '1020 KiB');
	t.is(prettyBytes(1_048_576, {binary: true}), '1 MiB');
	t.is(prettyBytes(1_048_577, {binary: true}), '1 MiB');
});

// Precision and edge cases
test('precision and edge cases', t => {
	// Values that might cause rounding issues
	t.is(prettyBytes(1020), '1.02 kB');
	t.is(prettyBytes(1030), '1.03 kB');
	t.is(prettyBytes(1099), '1.1 kB');
	t.is(prettyBytes(1499), '1.5 kB');
	t.is(prettyBytes(1500), '1.5 kB');
	t.is(prettyBytes(1999), '2 kB');

	// Rounding behavior at unit transitions
	t.is(prettyBytes(999_500), '1000 kB'); // Does not round to MB
	t.is(prettyBytes(999_499), '999 kB'); // Should stay in kB

	// Test binary rounding edge cases
	t.is(prettyBytes(1023.5, {binary: true}), '1020 B'); // Just under KiB
	t.is(prettyBytes(1024 * 1.5, {binary: true}), '1.5 KiB');
	t.is(prettyBytes(1024 * 1.9, {binary: true}), '1.9 KiB');
});

// Combined options tests
test('combined options', t => {
	// Signed + binary + bits
	t.is(prettyBytes(1024, {signed: true, binary: true, bits: true}), '+1 kibit');
	t.is(prettyBytes(-1024, {signed: true, binary: true, bits: true}), '-1 kibit');
	t.is(prettyBytes(0, {signed: true, binary: true, bits: true}), ' 0 b');

	// Locale + space + binary
	t.is(prettyBytes(1024, {locale: 'de', space: false, binary: true}), '1KiB');
	t.is(prettyBytes(1024.5, {locale: 'de', space: false, binary: true}), '1KiB');
	t.is(prettyBytes(1536, {locale: 'de', space: false, binary: true}), '1,5KiB');

	// Fraction digits + binary + bits + signed
	t.is(prettyBytes(2048, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 3,
		binary: true,
		bits: true,
		signed: true,
	}), '+2.00 kibit');

	// Test space option with 0 and signed values in all unit types
	t.is(prettyBytes(0, {bits: true, space: false}), '0b');
	t.is(prettyBytes(0, {binary: true, bits: true, space: false}), '0b');
	t.is(prettyBytes(0, {signed: true, space: false}), ' 0B');
	t.is(prettyBytes(0, {signed: true, bits: true, space: false}), ' 0b');
});

// BigInt tests
test('bigint tests', t => {
	t.is(prettyBytes(0n), '0 B');
	t.is(prettyBytes(-0n), '0 B');
	t.is(prettyBytes(1n), '1 B');
	t.is(prettyBytes(-1n), '-1 B');

	// Large BigInts
	const bigIntMax = BigInt(Number.MAX_SAFE_INTEGER);
	t.is(prettyBytes(bigIntMax), '9.01 PB');
	t.is(prettyBytes(bigIntMax * 100n), '901 PB');
});
