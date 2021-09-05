'use strict';

/*
Formats the given number using `Number#toLocaleString`.
- If locale is a string, the value is expected to be a locale-key (for example: `de`).
- If locale is true, the system default locale is used for translation.
- If no value for locale is specified, the number is returned unmodified.
*/
const toLocaleString = (number, locale, options) => {
	if (typeof locale === 'string' || Array.isArray(locale)) {
		return number.toLocaleString(locale, options);
	} else if (locale === true || options !== undefined) {
		return number.toLocaleString(undefined, options);
	}

	return number;
};

module.exports = (number, options) => {
	if (!Number.isFinite(number)) {
		throw new TypeError(`Expected a finite number, got ${typeof number}: ${number}`);
	}

	options = Object.assign({bits: false, binary: false}, options);

	const UNITS_FIRSTLETTER = (options.bits ? 'b' : 'B') + 'kMGTPEZY';

	if (options.signed && number === 0) {
		return ` 0 ${UNITS_FIRSTLETTER[0]}`;
	}

	const isNegative = number < 0;
	const prefix = isNegative ? '-' : (options.signed ? '+' : '');

	if (isNegative) {
		number = -number;
	}

	let localeOptions;

	if (options.minimumFractionDigits !== undefined) {
		localeOptions = {
			minimumFractionDigits: options.minimumFractionDigits
		};
	}

	if (options.maximumFractionDigits !== undefined) {
		localeOptions = Object.assign({
			maximumFractionDigits: options.maximumFractionDigits
		}, localeOptions);
	}

	if (number < 1) {
		const numberString = toLocaleString(number, options.locale, localeOptions);
		return prefix + numberString + ' ' + UNITS_FIRSTLETTER[0];
	}

	const exponent = Math.min(
		Math.floor(options.binary ? Math.log(number) / Math.log(1024) : Math.log10(number) / 3),
		UNITS_FIRSTLETTER.length - 1
	);
	// eslint-disable-next-line unicorn/prefer-exponentiation-operator
	number /= Math.pow(options.binary ? 1024 : 1000, exponent);

	if (!localeOptions) {
		number = number.toPrecision(3);
	}

	const numberString = toLocaleString(Number(number), options.locale, localeOptions);

	let unit = UNITS_FIRSTLETTER[exponent];
	if (exponent > 0) {
		unit += options.binary ? 'i' : '';
		unit += options.bits ? 'bit' : 'B';
	}

	return prefix + numberString + ' ' + unit;
};
