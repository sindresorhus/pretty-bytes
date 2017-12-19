'use strict';
const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

module.exports = (num, options) => {
	if (!Number.isFinite(num)) {
		throw new TypeError(`Expected a finite number, got ${typeof num}: ${num}`);
	}

	options = Object.assign({}, options);

	const neg = num < 0;

	if (neg) {
		num = -num;
	}

	if (num < 1) {
		num = toLocaleString(num, options.locale);
		return (neg ? '-' : '') + num + ' B';
	}

	const exponent = Math.min(Math.floor(Math.log10(num) / 3), UNITS.length - 1);
	let numStr = Number((num / Math.pow(1000, exponent)).toPrecision(3));
	numStr = toLocaleString(numStr, options.locale);

	const unit = UNITS[exponent];

	return (neg ? '-' : '') + numStr + ' ' + unit;
};

/**
 * Formats the given number using number.toLocaleString(..).
 * If locale is a string, the value is expected to be a locale-key (e.g. 'de').
 * If locale is true or 1, the system default locale is used for translation.
 * If no value for locale is specified, the number is returned unmodified.
 */
function toLocaleString(num, locale) {
	if (typeof locale === 'string') {
		return num.toLocaleString(locale);
	} else if (locale) {
		return num.toLocaleString();
	} else {
		return num;
	}
}
