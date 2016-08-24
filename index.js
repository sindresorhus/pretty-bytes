'use strict';
var numberIsNan = require('number-is-nan');

module.exports = function (num, opts) {
	if (typeof num !== 'number' || numberIsNan(num)) {
		throw new TypeError('Expected a number, got ' + typeof num);
	}
	if (!opts) {
		opts = {};
	}

	var exponent;
	var unit;
	var neg = num < 0;
	var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	if (neg) {
		num = -num;
	}

	if (num < 1) {
		if (opts.json) {
			return {
				num: (neg ? -1 : 1) * num,
				unit: 'B'
			};
		}

		return (neg ? '-' : '') + num + ' B';
	}

	exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
	num /= Math.pow(1000, exponent);
	unit = units[exponent];

	if (opts.json) {
		return {
			num: (neg ? -1 : 1) * num,
			unit: unit
		};
	}

	num = Number(num.toFixed(2));
	return (neg ? '-' : '') + num + ' ' + unit;
};
