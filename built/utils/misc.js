"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lightenDarkenColor = exports.stripUnitFromValue = exports.decodeStr = exports.encodeStr = exports.add = exports.escapeRegex = exports.compareArrByValue = exports.cleanupStacktrace = exports.indefiniteArticle = exports.normalizeUsername = exports.getCookieValue = exports.sanitizeUrl = exports.capitalizeString = exports.snakeToPascalString = exports.snakeToCamelString = exports.uncamelizeString = exports.tryJsonParse = exports.castBoolToStr = exports.columnPathLookup = exports.castFuzzyBool = exports.pathJoin = exports.isPlainObject = exports.isNumeric = exports.parseJSON = exports.calculateAge = exports.secondsToString = exports.durationBetweenDates = exports.formatDate = exports.defaultDateFormat = exports.memoizePromise = exports.memoizedObj = exports.generateObjMemoizer = exports.memoizeShallow = exports.memoize = void 0;
const ramda_1 = require("ramda");
const moize_1 = __importDefault(require("moize"));
const moment_1 = __importDefault(require("moment"));
const constants_1 = require("../constants");
const memoize = (fn, options = {}) => (0, moize_1.default)(fn, Object.assign({ maxSize: constants_1.moizeMaxSize }, options));
exports.memoize = memoize;
/**
 * Memoize using shallow equality to compare cache each key argument
 */
const memoizeShallow = (fn, options = {}) => (0, moize_1.default)(fn, Object.assign(Object.assign({ maxSize: constants_1.moizeMaxSize }, options), { isShallowEqual: true }));
exports.memoizeShallow = memoizeShallow;
/**
 * Utility to globally memoize objects such as props or params
 */
const generateObjMemoizer = () => (0, exports.memoizeShallow)((dep) => dep);
exports.generateObjMemoizer = generateObjMemoizer;
exports.memoizedObj = (0, exports.generateObjMemoizer)();
const memoizePromiseOptions = {
    maxSize: constants_1.moizeMaxSize,
    isShallowEqual: true,
    isPromise: true,
    maxAge: 1000 * 60 * 5,
    updateExpire: true,
};
/**
 * Memoizes an async function to prevent the thundering herd problem.
 * This makes duplicate calls (comparing params using shallow equality) to return the same promise.
 */
const memoizePromise = (asyncFn) => {
    const memoizedCb = (0, moize_1.default)(asyncFn, memoizePromiseOptions);
    return async (...params) => {
        try {
            const result = await memoizedCb(...params);
            // Clear the memoized cache when the promise is resolved (or rejected), so that all the subsequent calls will return a new promise
            memoizedCb.remove(params);
            return result;
        }
        catch (err) {
            memoizedCb.remove(params);
            throw err;
        }
    };
};
exports.memoizePromise = memoizePromise;
// Date formatter
exports.defaultDateFormat = 'MMM Do YYYY, hh:mm A';
const formatDate = (ts = '', format = exports.defaultDateFormat) => (0, moment_1.default)(ts).format(format);
exports.formatDate = formatDate;
const getDurationItemByLabels = (labels) => {
    return [
        { startFnName: 'asMonths', fnName: 'months', label: 'mo' },
        { startFnName: 'asDays', fnName: 'days', label: 'd' },
        { startFnName: 'asHours', fnName: 'hours', label: 'h' },
        { startFnName: 'asMinutes', fnName: 'minutes', label: 'm' },
        { startFnName: 'asSeconds', fnName: 'seconds', label: 's' },
    ].filter((item) => labels.includes(item.label));
};
/**
 * DurationBetweenDates utility function that returns difference between give start and end date
 * into format 'n day(s) n hour(s) n minute(s) depending on respective values.
 * @example ('2020-01-28T00:44:35.000Z', '2020-01-29T01:45:36.000Z') -> '1 day, 1 hour, 1 minute'
 * @param {{labels?: string[], renameLabels?: {[key: string]: string}, pluralize?: boolean}} options
 * @returns {function(string): string}
 */
const durationBetweenDates = ({ labels = ['mo', 'd', 'h', 'm'], renameLabels = {
    mo: 'month',
    d: 'day',
    h: 'hour',
    m: 'minute',
}, pluralize = true, }) => (0, exports.memoize)((startDateTime, endDateTime = new Date().valueOf()) => {
    const duration = moment_1.default.duration((0, moment_1.default)(endDateTime).diff((0, moment_1.default)(startDateTime)));
    const result = getDurationItemByLabels(labels).reduce((displayStr, curr) => {
        const value = Math.floor(duration[!displayStr ? curr.startFnName : curr.fnName]());
        if (value < 1) {
            return displayStr;
        }
        if (displayStr) {
            displayStr += ', ';
        }
        const pluralLabel = pluralize && value > 1 ? 's' : '';
        const label = renameLabels[curr.label] ? renameLabels[curr.label] : curr.label;
        return `${displayStr}${value} ${label}${pluralLabel}`;
    }, '');
    // if the format request doesn't include minutes, handle the case for new entities
    if (result === '') {
        const value = Math.ceil(duration.asMinutes());
        return `${value} minute${value !== 1 ? 's' : ''}`;
    }
    return result;
});
exports.durationBetweenDates = durationBetweenDates;
/**
 * Given a number of seconds returns the number of
 * years, months, days, hours and minutes in a human readable format
 * @param seconds
 * @returns {string}
 */
const secondsToString = (seconds) => {
    const min = 60;
    const hour = min * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    const units = { year, month, day, hour, min };
    let remainingSeconds = seconds;
    const results = Object.entries(units).reduce((acc, [unitName, unitSeconds]) => {
        const amount = Math.floor(remainingSeconds / unitSeconds);
        remainingSeconds %= units[unitName];
        if (amount >= 1) {
            return [...acc, `${amount} ${unitName}${amount >= 2 ? 's' : ''}`];
        }
        return acc;
    }, []);
    return results.join(', ');
};
exports.secondsToString = secondsToString;
/**
 * Given a timestamp, returns the years, months, days, hours and minutes in a human readable format
 * @param creationTimeStamp
 * @returns {string}
 */
exports.calculateAge = (0, exports.memoize)((creationTimestamp) => {
    if (!creationTimestamp)
        return null;
    return (0, exports.secondsToString)((0, moment_1.default)().diff(creationTimestamp, 's'));
});
// A more resilient JSON parsing that should always return {}
// in error conditions.
const parseJSON = (str) => {
    if (typeof str !== 'string') {
        return {};
    }
    try {
        const data = JSON.parse(str);
        return data;
    }
    catch (e) {
        console.error('Error parsing JSON', str);
        return {};
    }
};
exports.parseJSON = parseJSON;
const isNumeric = (n) => !Number.isNaN(parseFloat(n)) && Number.isFinite(+n);
exports.isNumeric = isNumeric;
const isPlainObject = (obj) => Object(obj) === obj && Object.getPrototypeOf(obj) === Object.prototype;
exports.isPlainObject = isPlainObject;
const duplicatedSlashesRegexp = new RegExp('(^\\/|[^:\\/]+\\/)\\/+', 'g');
// Given some path segments returns a properly formatted path similarly to Nodejs path.join()
// Remove duplicated slashes
// Does not remove leading/trailing slashes and adds a slash between segments
const pathJoin = (...pathParts) => []
    .concat(...pathParts) // Flatten
    .filter((segment) => !!segment) // Remove empty parts
    .join('/')
    .replace(duplicatedSlashesRegexp, '$1');
exports.pathJoin = pathJoin;
const castFuzzyBool = (value) => {
    const mappings = {
        // JS performs a narrowing cast of ints, bools, and strings to the same key.
        false: false,
        true: true,
        0: false,
        1: true,
        False: false,
        True: true,
    };
    if (mappings[value] !== undefined) {
        return mappings[value];
    }
    return false;
};
exports.castFuzzyBool = castFuzzyBool;
const columnPathLookup = (_path) => (_, row) => (0, ramda_1.path)(_path.split('.'), row);
exports.columnPathLookup = columnPathLookup;
const castBoolToStr = (t = 'Enabled', f = 'Not Enabled') => (value) => value ? t : f;
exports.castBoolToStr = castBoolToStr;
exports.tryJsonParse = (0, moize_1.default)((val) => (typeof val === 'string' ? JSON.parse(val) : val));
/**
 * Converts a camelCased string to a string with capitalized words separated by spaces
 * @example "camelCasedExampleString" -> "Camel Cased Example String"
 * @param inputStr
 * @returns {string}
 */
const uncamelizeString = (inputStr = '') => inputStr
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase());
exports.uncamelizeString = uncamelizeString;
/**
 * Converts a snake-case string to camelCase
 * @param inputStr
 */
const snakeToCamelString = (inputStr) => inputStr.replace(/-([A-Z])/gi, (str) => str.toUpperCase()).replace(/-/g, '');
exports.snakeToCamelString = snakeToCamelString;
/**
 * Converts a snake-case string to PascalCase
 * @param inputStr
 */
const snakeToPascalString = (inputStr) => inputStr
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/-([A-Z])/gi, (str) => str.toUpperCase())
    .replace(/-/g, '');
exports.snakeToPascalString = snakeToPascalString;
/**
 * Capitalize the first letter of the given string
 * @param inputStr
 * @returns {*}
 */
const capitalizeString = (inputStr = '') => inputStr
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase());
exports.capitalizeString = capitalizeString;
/**
 * Transform a string so that it only has alpha-numeric and hypens.  Useful for FQDN's.
 * @param {string} str
 * @returns {string}
 */
const sanitizeUrl = (str = '') => str
    .replace(/[^a-zA-Z0-9-_.]/g, '-') // replace non-valid url characters with hyphen
    .replace(/^-+/, '') // eliminate leading hyphens
    .replace(/\.+$/, ''); // eliminate trailing dots
exports.sanitizeUrl = sanitizeUrl;
const getCookieValue = (name) => {
    const val = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
    return val ? val.pop() : '';
};
exports.getCookieValue = getCookieValue;
const normalizeUsername = (name = '') => {
    if (!name)
        return name;
    // split emails from @ sign and take the left hand side
    const [username] = name.split('@');
    return username;
};
exports.normalizeUsername = normalizeUsername;
// Really simple indefinite article function, does not account for special
// cases such as 'a user'
const indefiniteArticle = (word = '') => (/^([aeiou])/i.test(word) ? 'an' : 'a');
exports.indefiniteArticle = indefiniteArticle;
const cleanupStacktrace = (stacktrace = '') => stacktrace
    .split('\n')
    .filter((res) => !!res.trim())
    .join('\n\n');
exports.cleanupStacktrace = cleanupStacktrace;
const compareArrByValue = (key, order = 'asc') => (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
    }
    const comparison = a[key].localeCompare(b[key]);
    return order === 'desc' ? comparison * -1 : comparison;
};
exports.compareArrByValue = compareArrByValue;
// Simple escape function to sanitize inputs before using in regexes
const escapeRegex = (str) => {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
};
exports.escapeRegex = escapeRegex;
const add = (value, total) => (value ? parseFloat(value) + parseFloat(total || 0) : total);
exports.add = add;
// export const encodeStr = (str: string) => Buffer.from(str).toString('base64')
const encodeStr = (str) => btoa(str);
exports.encodeStr = encodeStr;
// export const decodeStr = (str: string) => Buffer.from(str, 'base64').toString('ascii')
const decodeStr = (str) => atob(str); // Buffer doesnt work
exports.decodeStr = decodeStr;
const stripUnitFromValue = (value) => {
    const hasNumber = /\d/.test(value);
    if (!hasNumber)
        return value;
    return parseFloat(value);
};
exports.stripUnitFromValue = stripUnitFromValue;
// ref:https://css-tricks.com/snippets/javascript/lighten-darken-color/
function lightenDarkenColor(color, amt) {
    let usePound = false;
    if (color && color[0] == '#') {
        color = color.slice(1);
        usePound = true;
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) + amt;
    if (r > 255)
        r = 255;
    else if (r < 0)
        r = 0;
    let b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255)
        b = 255;
    else if (b < 0)
        b = 0;
    let g = (num & 0x0000ff) + amt;
    if (g > 255)
        g = 255;
    else if (g < 0)
        g = 0;
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}
exports.lightenDarkenColor = lightenDarkenColor;
//# sourceMappingURL=misc.js.map