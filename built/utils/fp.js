"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyDefinedValues = exports.switchCase = exports.filterIf = exports.applyJsonPatch = exports.upsertAllBy = exports.removeWith = exports.updateWith = exports.adjustWith = exports.updateInArray = exports.condLiteral = exports.maybeFnOrNull = exports.ensureFunction = exports.ensureArrayHandleNull = exports.ensureArray = exports.objToCommaSeperatedString = exports.arrToObjByKey = exports.pipeWhenTruthy = exports.lensPathStr = exports.pathEqStr = exports.pathStrOrNull = exports.pathStrOr = exports.pathStr = exports.hasPathStr = exports.dissocPathStr = exports.assocPathStr = exports.dotStrPathToArr = exports.keyValueArrToObj = exports.objToKeyValueArr = exports.except = exports.range = exports.setStateLens = exports.setObjLens = exports.filterFields = exports.pickMultiple = exports.mergeKey = exports.tap = exports.projectAs = exports.pick = exports.pipe = exports.compose = exports.hasKeys = exports.notEmpty = exports.objIfNilOrEmpty = exports.arrayIfNilOrEmpty = exports.arrayIfEmpty = exports.stringIfNil = exports.arrayIfNil = exports.isNilOrEmpty = exports.noop = exports.exists = exports.isFalse = exports.isTruthy = exports.pluck = exports.getTypedEmptyArr = exports.emptyObj = exports.emptyArr = exports.stopBubbling = exports.preventDefault = exports.stopPropagation = void 0;
const ramda_1 = require("ramda");
const misc_1 = require("./misc");
// Callback bubblers
exports.stopPropagation = (e) => e.stopPropagation();
exports.preventDefault = (e) => e.preventDefault();
exports.stopBubbling = (e) => {
    e.stopPropagation();
    e.preventDefault();
};
// State hook initializers
exports.emptyArr = [];
exports.emptyObj = {};
exports.getTypedEmptyArr = () => exports.emptyArr;
// Functional programming helpers
exports.pluck = (key) => (obj) => obj[key];
exports.isTruthy = (x) => !!x;
exports.isFalse = (x) => !x;
exports.exists = (x) => x !== undefined;
exports.noop = () => { };
exports.isNilOrEmpty = ramda_1.either(ramda_1.isNil, ramda_1.isEmpty);
exports.arrayIfNil = ramda_1.when(ramda_1.isNil, ramda_1.always(exports.emptyArr));
exports.stringIfNil = ramda_1.when(ramda_1.isNil, ramda_1.always(''));
exports.arrayIfEmpty = ramda_1.when(ramda_1.isEmpty, ramda_1.always(exports.emptyArr));
exports.arrayIfNilOrEmpty = ramda_1.when(ramda_1.either(ramda_1.isNil, ramda_1.isEmpty), ramda_1.always(exports.emptyArr));
exports.objIfNilOrEmpty = ramda_1.when(ramda_1.either(ramda_1.isNil, ramda_1.isEmpty), ramda_1.always(exports.emptyObj));
// Works for arrays and strings.  All other types return false.
exports.notEmpty = (arr) => !!(arr && arr.length);
exports.hasKeys = (obj) => {
    if (!(obj instanceof Object)) {
        return false;
    }
    return Object.keys(obj).length > 0;
};
exports.compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
exports.pipe = (...fns) => exports.compose(...fns.reverse());
exports.pick = (key) => (obj) => obj[key];
// Project the keys from the array of objects and rename them at the same time
// Ex:
// const values = [{ a: 123, b: 456 }, { c: 555 }]
// const mappings = { first: 'a', second: 'b', third: 'c' }
// projectAs(mappings, values) -> [{ first: 123, second: 456 }, { third: 555 }]
exports.projectAs = ramda_1.curry((mappings, arr) => arr.map((obj) => Object.keys(mappings).reduce((accum, destKey) => {
    const srcKey = mappings[destKey];
    if (exports.exists(obj === null || obj === void 0 ? void 0 : obj[srcKey])) {
        accum[destKey] = obj[srcKey];
    }
    return accum;
}, {})));
// Transparently inject side-effects in a functional composition "chain".
// Ex: const value = await somePromise.then(tap(x => console.log))
// Ex: compose(fn1, fn2, fn3, tap(log), fn4)(value)
exports.tap = (fn) => (arg) => {
    fn(arg);
    return arg;
};
exports.mergeKey = (srcObj, destObj = {}, key) => {
    const clonedObj = Object.assign({}, destObj);
    if (srcObj[key] !== undefined) {
        clonedObj[key] = srcObj[key];
    }
    return clonedObj;
};
exports.pickMultiple = (...keys) => (obj) => keys.reduce((accum, key) => exports.mergeKey(obj, accum, key), {});
exports.filterFields = (...keys) => (obj) => Object.keys(obj).reduce((accum, key) => (keys.includes(key) ? accum : exports.mergeKey(obj, accum, key)), {});
// Lens-style setter useful for setState operations
// Allows for setting of values in a deeply nested object using cloning.
// We can extend with other functionality like arrays and using
// functions as selectors in the future if it looks like it will be useful.
function setObjLens(obj, value, paths) {
    const [head, ...tail] = paths;
    if (tail.length === 0) {
        return Object.assign(Object.assign({}, obj), { [head]: value });
    }
    return Object.assign(Object.assign({}, obj), { [head]: setObjLens(obj[head], value, tail) });
}
exports.setObjLens = setObjLens;
exports.setStateLens = (value, paths) => (state) => {
    return setObjLens(state, value, paths);
};
exports.range = (start, end) => {
    const arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
};
// Returns a new array without the specified item
exports.except = ramda_1.curry((item, arr) => {
    return ramda_1.remove(arr.indexOf(item), 1, arr);
});
// Converts from { foo: 'bar' } to [{ key: 'foo', value: 'bar' }]
exports.objToKeyValueArr = (obj = {}) => Object.entries(obj).map(([key, value]) => ({ key, value }));
// Converts from [{ key: 'foo', value: 'bar' }] to { foo: 'bar' }
exports.keyValueArrToObj = (arr = []) => arr.reduce((accum, { key, value }) => {
    accum[key] = value;
    return accum;
}, {});
/**
 * Converts a dot notation string to a path array
 * @example
 * dotStrPathToArr('boo.0.foo') => ['boo', 0, 'foo']
 */
exports.dotStrPathToArr = misc_1.memoize((str) => str === null || str === void 0 ? void 0 : str.split('.').map((segment) => (misc_1.isNumeric(segment) ? +segment : segment)));
exports.assocPathStr = ramda_1.curry((str, val, obj) => ramda_1.assocPath(exports.dotStrPathToArr(str), val, obj));
exports.dissocPathStr = ramda_1.curry((str, obj) => ramda_1.dissocPath(exports.dotStrPathToArr(str), obj));
exports.hasPathStr = ramda_1.curry((str, obj) => ramda_1.hasPath(exports.dotStrPathToArr(str), obj));
exports.pathStr = ramda_1.curry((str, obj) => ramda_1.path(exports.dotStrPathToArr(str), obj));
exports.pathStrOr = ramda_1.curry((defaultValue, str, obj) => ramda_1.pathOr(defaultValue, exports.dotStrPathToArr(str), obj));
exports.pathStrOrNull = ramda_1.curry((str, obj) => ramda_1.pathOr(null, exports.dotStrPathToArr(str), obj));
exports.pathEqStr = ramda_1.curry((str, val, obj) => ramda_1.pathEq(exports.dotStrPathToArr(str), val, obj));
exports.lensPathStr = ramda_1.curry((str, val) => ramda_1.lens(exports.dotStrPathToArr(str), val));
// I didn't see anything in Ramda that would allow me to create a "Maybe"
// composition so creating a simple version here.
// With long chains of functions it can get annoying to make sure each one
// contains a valid value before continuing.  This HOF performs a pipe but
// only when each function returns something truthy.
exports.pipeWhenTruthy = (...fns) => (arg) => {
    if (!exports.isTruthy(arg)) {
        return null;
    }
    const [head, ...tail] = fns;
    if (!head) {
        return arg;
    }
    const result = head(arg);
    if (tail.length > 0) {
        if (!exports.isTruthy(result)) {
            return null;
        }
        return exports.pipeWhenTruthy(...tail)(result);
    }
    return result;
};
// Converts an array of items to a map/dictionary/assocArray form.
// Useful when an array needs to be indexed by a key from each of the itmes.
exports.arrToObjByKey = ramda_1.curry((key, arr) => arr.reduce((accum, item) => {
    accum[item[key]] = item;
    return accum;
}, {}));
// {a: 1, b: 2, c: 3} to "a=1,b=2,c=3"
exports.objToCommaSeperatedString = (obj) => {
    if (!(obj instanceof Object)) {
        return obj;
    }
    return Object.keys(obj)
        .reduce((prev, key) => prev + `${key}=${obj[key]},`, '')
        .slice(0, -1);
};
exports.ensureArray = (maybeArr) => maybeArr && maybeArr instanceof Array ? maybeArr : [maybeArr];
exports.ensureArrayHandleNull = (maybeArr) => (maybeArr === null ? [] : exports.ensureArray(maybeArr));
exports.ensureFunction = misc_1.memoize((maybeFunc) => (...args) => {
    if (typeof maybeFunc === 'function') {
        return maybeFunc(...args);
    }
    return maybeFunc;
});
exports.maybeFnOrNull = (fn) => (value) => value ? fn(value) : null;
// Create a function that compares a value against multiple predicate functions,
// returning the first 'literal' from the matching predicate pair.
// If none match, then undefined is returned.
// (...[predicateFn, literal]) -> value -> literal
exports.condLiteral = (...conds) => (value) => {
    for (let i = 0; i < conds.length; i++) {
        const [pred, literal] = conds[i];
        if (pred(value)) {
            return literal;
        }
    }
};
// Update an object in an array using a predicateFn and an updateFn.
//
// updateInArray :: (obj -> Boolean) -> (obj -> obj) -> arr -> arr
//
// Ex: updateInArray(
//   obj => obj.id === id,
//   obj => ({ ...obj, name: 'changed' }),
//   arr
// )
exports.updateInArray = ramda_1.curry((predicateFn, updateFn, arr) => arr.map((item) => (predicateFn(item) ? updateFn(item) : item)));
// Like `updateInArray` but stops after finding the element to update
// Also like ramda `adjust` but using a predicateFn
exports.adjustWith = ramda_1.curry((predicateFn, updateFn, arr) => ramda_1.adjust(ramda_1.findIndex(predicateFn, arr), updateFn, arr));
// Like ramda `update` but using a predicateFn
exports.updateWith = ramda_1.curry((predicateFn, newValue, arr) => ramda_1.update(ramda_1.findIndex(predicateFn, arr), newValue, arr));
// Remove an item from an array using a predicateFn
exports.removeWith = ramda_1.curry((predicateFn, arr) => ramda_1.remove(ramda_1.findIndex(predicateFn, arr), 1, arr));
/**
 * Insert a set of items in an array by updating the items that match the provided predicate and adding the ones that do not match.
 * @param {function} predicateFn Predicate used to determine which items in the target array should be updated. The new items will be compared to the items in the target array using this predicate.
 * @param {array} newItems The items that will be added or used to update the target array
 * @param {array} targetArr The array that will receive the new items
 * @example
 * const targetArr = [{id: 1, val: "one"},{id: 2, val: "two"},{id: 3, val: "three"}]
 * const newItems = [{id: 2, val: "new two"}, {id: 4, val: "new four"}]
 * upsertAllBy(R.prop('id'), newItems, targetArr) -> [{id: 1, val: "one"},{id: 2, val: "new two"},{id: 3, val: "three"},{id: 4, val: "new four}]
 */
exports.upsertAllBy = ramda_1.curry(function upsertAllBy(predicateFn, newItems, targetArr) {
    const itemsMap = new Map();
    for (const item of targetArr) {
        itemsMap.set(predicateFn(item), item);
    }
    for (const item of newItems) {
        const key = predicateFn(item);
        itemsMap.set(key, Object.assign(Object.assign({}, (itemsMap.get(key) || exports.emptyObj)), item));
    }
    return Array.from(itemsMap.values());
});
// applyJsonPatch :: oldObject -> patch -> newObject
exports.applyJsonPatch = ramda_1.curry((patch, obj) => {
    const { op, path, value } = patch;
    // assocPath requires array indexes to be integer not string
    const convertIntsToInts = (n) => (!isNaN(n) ? parseInt(n, 10) : n);
    const pathParts = path.split('/').slice(1).map(convertIntsToInts);
    if (op === 'replace') {
        return ramda_1.assocPath(pathParts, value, obj);
    }
    return obj;
});
// Perform a filter on the provided array if the passed boolean is truthy
exports.filterIf = ramda_1.curry((cond, fn, items) => (cond ? ramda_1.filter(fn, items) : items));
/**
 * A functional switch case that accepts an object as an input of cases
 * @param {object} casesObj Object whose keys will be the conditions to test against the provided value
 * @param {*} [defaultValue] Value to be returned when no case matches the key
 * @returns {function(string): any}
 *
 * @example
 *
 * const stringsSwitch = switchCase({
 *   foo: "value foo",
 *   bar: "value bar"
 * }, "defaultValue")
 *
 * stringsSwitch("foo")  // "value foo"
 * stringsSwitch("test") // "defaultValue"
 */
exports.switchCase = (casesObj, defaultValue) => (input) => casesObj.hasOwnProperty(input) ? casesObj[input] : defaultValue;
// Typically used for forms with optional fields to ensure empty string values etc are not passed
exports.onlyDefinedValues = (obj) => ramda_1.reject((val) => ['', undefined, null].includes(val))(obj);
// /**
//  * Given a "params" object with single values or arrays of values, returns an array with all the
//  * possible permutations of the params as a single value params
//  * @example
//  *
//  * paramsCartesianProduct({
//  * 	clusterId: ['foo', 'bar'],
//  * 	namespace: 'test'
//  * })
//  * // Result
//  * [
//  *  { clusterId: "foo", namespace: "test" }
//  *  { clusterId: "bar", namespace: "test" }
//  * ]
//  *
//  * @param params
//  */
// export function paramsCartesianProduct(params) {
//   const objEntries = Object.entries(params)
//   const cartesianMerge = liftN(objEntries.length, (...args) => mergeAll(args))
//   const isolatedParamsArr = objEntries.map(([key, value]) => {
//     if (Array.isArray(value)) {
//       return value.map((v) => ({ [key]: v }))
//     }
//     return [{ [key]: value }]
//   })
//   return isolatedParamsArr.length ? cartesianMerge(...isolatedParamsArr) : [params]
// }
//# sourceMappingURL=fp.js.map