"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoverText = exports.getLogs = exports.LogColors = void 0;
var LogColors;
(function (LogColors) {
    LogColors["CodeBlue"] = "code-blue";
    LogColors["Default"] = "default";
})(LogColors = exports.LogColors || (exports.LogColors = {}));
const getLogs = (logs) => {
    if (typeof logs === 'string') {
        return logs.split('\n');
    }
    return logs;
};
exports.getLogs = getLogs;
const discoverText = (text, idx) => {
    if (idx === 0 && isDate(text)) {
        return LogColors.CodeBlue;
    }
    return LogColors.Default;
};
exports.discoverText = discoverText;
const isDate = (str = '') => /\d{2}[./-:]\d{2}[./-:]\d{4}/.test(str);
//# sourceMappingURL=helpers.js.map