"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = exports.debounce = exports.clearDebounceMemory = exports.sleep = exports.someAsync = exports.propsAsync = exports.tryCatchAsync = exports.flatMapAsync = exports.mapAsync = exports.pipeAsync = exports.pluckAsync = void 0;
const ramda_1 = require("ramda");
const fp_1 = require("./fp");
exports.pluckAsync = (0, ramda_1.curry)((key, promise) => promise.then((obj) => obj[key]));
// eslint-disable-next-line @typescript-eslint/require-await
const pipeAsync = (...fns) => async (params) => fns.reduce(async (prevPromise, nextCb) => nextCb(await prevPromise), params);
exports.pipeAsync = pipeAsync;
exports.mapAsync = (0, ramda_1.curry)(async (callback, arr) => {
    return Promise.all(arr.map((val, i) => callback(val, i, arr)));
});
exports.flatMapAsync = (0, ramda_1.curry)(async (callback, arr) => {
    return (0, ramda_1.flatten)(await Promise.all(arr.map(async (val, i) => (0, fp_1.ensureArray)(await callback(val, i, arr)))));
});
// Functional async try catch
exports.tryCatchAsync = (0, ramda_1.curry)(async (tryer, catcher, input) => {
    try {
        return await tryer(input);
    }
    catch (e) {
        return catcher(e);
    }
});
/**
 * Like Promise.all but for object properties instead of iterated values

 * @param objPromises
 * @returns {Promise<any>}
 *
 * @example
 * propsAsync({
 *   foo: getFoo(),
 *   boo: getBoo(),
 * }).then(results => {
 *   console.log(results.foo, results.boo);
 * })
 */
const propsAsync = async (objPromises) => {
    // TODO: Fix Typings
    const promises = Object.values((0, ramda_1.mapObjIndexed)(async (promise, key) => [key, await promise], objPromises));
    const results = await Promise.all(promises);
    // @ts-ignore
    return (0, ramda_1.fromPairs)(results);
};
exports.propsAsync = propsAsync;
/**
 * Like Promise.all but it won't reject if any (or all) of the promises are rejected
 * and it will always fullfill by returning an array with the successful results
 * An error handler function can be provided to deal with promise rejections individually
 * @param promises
 * @param [errorHandler] Function that can be used to handle the rejected promises
 * @returns {Promise<[*,...]>}
 */
const someAsync = async (promises, errorHandler = (err) => console.warn(err)) => {
    const results = await Promise.all(promises.map(async (promise) => {
        try {
            return [await promise];
        }
        catch (err) {
            errorHandler(err);
            return null;
        }
    }));
    // Return only the successful results
    return results.filter(Array.isArray).map(([firstItem]) => firstItem);
};
exports.someAsync = someAsync;
const sleep = async (ms) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
};
exports.sleep = sleep;
const timeoutMap = new Map();
const clearDebounceMemory = (fn) => {
    if (timeoutMap.has(fn)) {
        const id = timeoutMap.get(fn);
        clearTimeout(id);
    }
};
exports.clearDebounceMemory = clearDebounceMemory;
function debounce(fn, ms = 500, setTimeout = global.setTimeout) {
    let id;
    const debouncedFn = async (...args) => {
        (0, exports.clearDebounceMemory)(fn);
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
function throttle(callback, limit) {
    let waiting = false;
    return function () {
        if (!waiting) {
            callback.apply(this, arguments);
            waiting = true;
            setTimeout(function () {
                waiting = false;
            }, limit);
        }
    };
}
exports.throttle = throttle;
//# sourceMappingURL=async.js.map