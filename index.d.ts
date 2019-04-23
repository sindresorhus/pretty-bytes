declare namespace prettyBytes {
	interface Options {
		/**
		Include plus sign for positive numbers. If the difference is exactly zero a space character will be prepended instead for better alignment.

		@default false
		*/
		readonly signed?: boolean;

		/**
		- If `false`: Output won't be localized.
		- If `true`: Localize the output using the system/browser locale.
		- If `string`: Expects a [BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) (For example: `en`, `de`, …)

		__Note:__ Localization should generally work in browsers. Node.js needs to be [built](https://github.com/nodejs/node/wiki/Intl) with `full-icu` or `system-icu`. Alternatively, the [`full-icu`](https://github.com/unicode-org/full-icu-npm) module can be used to provide support at runtime.

		@default false
		*/
		readonly locale?: boolean | string;
	}
}

/**
Convert bytes to a human readable string: `1337` → `1.34 kB`.

@param number - The number to format.

@example
```
import prettyBytes = require('pretty-bytes');

prettyBytes(1337);
//=> '1.34 kB'

prettyBytes(100);
//=> '100 B'

// Display file size differences
prettyBytes(42, {signed: true});
//=> '+42 B'

// Localized output using German locale
prettyBytes(1337, {locale: 'de'});
//=> '1,34 kB'
```
*/
declare function prettyBytes(
	number: number,
	options?: prettyBytes.Options
): string;

export = prettyBytes;
