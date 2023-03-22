"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.clearDebounceMemory = void 0;
const timeoutMap = new Map();
exports.clearDebounceMemory = (fn) => {
    if (timeoutMap.has(fn)) {
        const id = timeoutMap.get(fn);
        clearTimeout(id);
    }
};
function debounce(fn, ms = 500, setTimeout = global.setTimeout) {
    let id;
    const debouncedFn = async (...args) => {
        exports.clearDebounceMemory(fn);
        return new Promise((resolve) => {
            id = setTimeout(() => {
                timeoutMap.delete(fn);
                resolve(fn(...args));
            }, ms);
            timeoutMap.set(fn, id);
        });
    };
    debouncedFn.cancel = () => {
        clearTimeout(id);
        debouncedFn.cancelled = true;
    };
    debouncedFn.cancelled = false;
    return debouncedFn;
}
exports.debounce = debounce;
//# sourceMappingURL=async.js.map