import {expectType} from 'tsd';
import prettyBytes from './index.js';

// Basic type tests
expectType<string>(prettyBytes(1337));
expectType<string>(prettyBytes(42, {signed: true}));
expectType<string>(prettyBytes(1337, {locale: 'de'}));
expectType<string>(prettyBytes(1337, {locale: true}));
expectType<string>(prettyBytes(1337, {bits: true}));
expectType<string>(prettyBytes(1337, {binary: true}));
expectType<string>(prettyBytes(1337, {space: true}));

// Advanced type tests
expectType<string>(prettyBytes(BigInt(9_007_199_254_740_991))); // Max safe integer as BigInt
expectType<string>(prettyBytes(-1337));
expectType<string>(prettyBytes(0));

// Options combinations
expectType<string>(prettyBytes(1337, {
	bits: true,
	binary: true,
	signed: true,
	space: false,
}));

// Locale options
expectType<string>(prettyBytes(1337, {locale: ['fr', 'en']}));

// Precision options
expectType<string>(prettyBytes(1337, {
	minimumFractionDigits: 2,
	maximumFractionDigits: 4,
}));

// All options combined
expectType<string>(prettyBytes(1337, {
	bits: true,
	binary: true,
	signed: true,
	space: false,
	locale: 'de',
	minimumFractionDigits: 1,
	maximumFractionDigits: 3,
}));

// Note: Runtime error checks are performed in test.js
// Type safety is enforced by TypeScript compiler
