"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultItemToString = void 0;
function defaultItemToString(item) {
    var _a;
    return item ? (_a = item.label) !== null && _a !== void 0 ? _a : (item.value ? String(item.value) : null) : null;
}
exports.defaultItemToString = defaultItemToString;
//# sourceMappingURL=helpers.js.map