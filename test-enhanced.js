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

// Testing precision edge cases
test('precision edge cases are handled correctly', t => {
	// Values that might cause rounding issues
	t.is(prettyBytes(1020), '1.02 kB');
	t.is(prettyBytes(1030), '1.03 kB');
	t.is(prettyBytes(1099), '1.1 kB');
	t.is(prettyBytes(1499), '1.5 kB');
	t.is(prettyBytes(1500), '1.5 kB');
	t.is(prettyBytes(1999), '2 kB');
});
