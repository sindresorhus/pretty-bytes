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
		return (neg ? '-' : '') + num + ' B';
	}

	const exponent = Math.min(Math.floor(Math.log10(num) / 3), UNITS.length - 1);
	const numTmp = Number((num / Math.pow(1000, exponent)).toPrecision(3));
	const numStr = options.localize ? numTmp.toLocaleString() : numTmp;
	const unit = UNITS[exponent];

	return (neg ? '-' : '') + numStr + ' ' + unit;
};
