"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formattedName = exports.formattedDate = exports.addComma = exports.formattedValue = void 0;
const moment_1 = __importDefault(require("moment"));
// Converting the value(bytes) to output unit(optional) with commas
const formattedValue = (bytes, unit = 'Bytes', decimalDigits = 2) => {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === undefined || isNaN(bytes) || bytes < 0)
        return 'Invalid value input.';
    if (decimalDigits < 0)
        return 'Invalid decimal digits input.';
    if (unit === '' || bytes === 0)
        return (0, exports.addComma)(bytes, decimalDigits) + ' Bytes';
    if (units.indexOf(unit) === -1) {
        return 'Output unit not found.';
    }
    const pos = units.indexOf(unit);
    return (0, exports.addComma)(bytes / Math.pow(1024, pos), decimalDigits) + ' ' + unit;
};
exports.formattedValue = formattedValue;
const addComma = (num, decimalDigits = 2) => {
    const floorPart = Math.floor(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const roundPart = Math.round(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const decimalPart = (num - Math.floor(num)).toFixed(decimalDigits).substring(2);
    if (decimalDigits === 0)
        return roundPart;
    else if ((num - Math.floor(num)).toFixed(decimalDigits).startsWith('1')) {
        return roundPart + '.' + decimalPart;
    }
    return floorPart + '.' + decimalPart;
};
exports.addComma = addComma;
// Transfer UTC time string into string like 'Jan 1, 2018 12:10:24' in local time.
const formattedDate = (str) => {
    if (!str || !(0, moment_1.default)(str).isValid())
        return 'Invalid date input.';
    return (0, moment_1.default)(str).format('lll');
};
exports.formattedDate = formattedDate;
const formattedName = (str = '') => {
    if (!str)
        return '';
    return str
        .toLowerCase()
        .replace(/_/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ');
};
exports.formattedName = formattedName;
//# sourceMappingURL=formatters.js.map