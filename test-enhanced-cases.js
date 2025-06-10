import test from 'ava';
import prettyBytes from './index.js';

// Unit transition boundary tests
test('unit transition boundaries are handled correctly', t => {
	// Bytes to kilobytes boundary (1000 vs 1001)
	t.is(prettyBytes(999), '999 B');
	t.is(prettyBytes(1000), '1 kB');
	t.is(prettyBytes(1001), '1 kB');

	// KB to MB transition
	t.is(prettyBytes(999_999), '1000 kB');
	t.is(prettyBytes(1_000_000), '1 MB');
	t.is(prettyBytes(1_000_001), '1 MB');

	// MB to GB transition
	t.is(prettyBytes(999_999_999), '1000 MB');
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

// Very small numbers and fractional bytes
test('very small numbers are handled correctly', t => {
	t.is(prettyBytes(0.001), '0.001 B');
	t.is(prettyBytes(0.0001), '0.0001 B');
	t.is(prettyBytes(0.000_01), '0.00001 B');
	t.is(prettyBytes(0.5), '0.5 B');

	// Negative small numbers
	t.is(prettyBytes(-0.001), '-0.001 B');
	t.is(prettyBytes(-0.0001), '-0.0001 B');
});

// Very large numbers and BigInt edge cases
test('very large numbers are handled correctly', t => {
	// Approach upper limits of Number
	t.is(prettyBytes(1e21), '1 ZB');

	// Beyond Number.MAX_SAFE_INTEGER
	t.is(prettyBytes(9_007_199_254_740_992n), '9.01 PB'); // 2^53
	t.is(prettyBytes(BigInt(Number.MAX_SAFE_INTEGER) * 100n), '901 PB');

	// Extreme large values
	const extremelyLarge = 10n ** 36n; // 10^36
	t.is(prettyBytes(extremelyLarge), '1000000000000 YB');

	// Negative extremely large value
	const negativeExtremelyLarge = -(10n ** 33n);
	t.is(prettyBytes(negativeExtremelyLarge), '-1000000000 YB');
});

// Testing all unit progressions
test('all unit progressions are displayed correctly', t => {
	// Test each unit transition for standard representation
	t.is(prettyBytes(1), '1 B');
	t.is(prettyBytes(1000), '1 kB');
	t.is(prettyBytes(1_000_000), '1 MB');
	t.is(prettyBytes(1_000_000_000), '1 GB');
	t.is(prettyBytes(1_000_000_000_000), '1 TB');
	t.is(prettyBytes(1_000_000_000_000_000), '1 PB');
	t.is(prettyBytes(1_000_000_000_000_000_000n), '1 EB');
	t.is(prettyBytes(1_000_000_000_000_000_000_000n), '1 ZB');
	t.is(prettyBytes(1_000_000_000_000_000_000_000_000n), '1 YB');

	// Test each unit transition for binary representation
	t.is(prettyBytes(1, {binary: true}), '1 B');
	t.is(prettyBytes(1024, {binary: true}), '1 KiB');
	t.is(prettyBytes(1_048_576, {binary: true}), '1 MiB');
	t.is(prettyBytes(1_073_741_824, {binary: true}), '1 GiB');
	t.is(prettyBytes(1_099_511_627_776, {binary: true}), '1 TiB');
	t.is(prettyBytes(1_125_899_906_842_624, {binary: true}), '1 PiB');
	t.is(prettyBytes(1_152_921_504_606_846_976n, {binary: true}), '1 EiB');
	t.is(prettyBytes(1_180_591_620_717_411_303_424n, {binary: true}), '1 ZiB');
	t.is(prettyBytes(1_208_925_819_614_629_174_706_176n, {binary: true}), '1 YiB');
});

// Testing precision edge cases
test('precision edge cases are handled correctly', t => {
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

// Combining multiple options
test('multiple options work correctly together', t => {
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

// Special cases including zeros
test('special zeros and number representations', t => {
	// Different representations of zero
	t.is(prettyBytes(0), '0 B');
	t.is(prettyBytes(-0), '0 B');
	t.is(prettyBytes(0n), '0 B');

	// Positive and negative zeros with signed option
	t.is(prettyBytes(0, {signed: true}), ' 0 B');
	t.is(prettyBytes(-0, {signed: true}), ' 0 B');
	t.is(prettyBytes(0n, {signed: true}), ' 0 B');

	// Value that would display as 0 in some number formats
	t.is(prettyBytes(0.000_000_000_01), '1e-11 B');
	t.is(prettyBytes(Number.MIN_VALUE), Number.MIN_VALUE + ' B');
});
