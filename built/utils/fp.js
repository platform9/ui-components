"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.condLiteral = exports.maybeFnOrNull = exports.ensureFunction = exports.ensureArrayHandleNull = exports.ensureArray = exports.objToCommaSeperatedString = exports.arrToObjByKey = exports.pipeWhenTruthy = exports.lensPathStr = exports.pathEqStr = exports.pathStrOrNull = exports.pathStrOr = exports.pathStr = exports.hasPathStr = exports.dissocPathStr = exports.assocPathStr = exports.dotStrPathToArr = exports.keyValueArrToObj = exports.objToKeyValueArr = exports.except = exports.range = exports.setStateLens = exports.setObjLens = exports.filterFields = exports.pickMultiple = exports.mergeKey = exports.tap = exports.projectAs = exports.pick = exports.pipe = exports.compose = exports.hasKeys = exports.notEmpty = exports.objIfNilOrEmpty = exports.arrayIfNilOrEmpty = exports.arrayIfEmpty = exports.stringIfNil = exports.arrayIfNil = exports.isNilOrEmpty = exports.noop = exports.exists = exports.isFalse = exports.isTruthy = exports.pluck = exports.getTypedEmptyArr = exports.emptyObj = exports.emptyArr = exports.stopBubbling = exports.preventDefault = exports.stopPropagation = void 0;
exports.paramsCartesianProduct = exports.onlyDefinedValues = exports.switchCase = exports.filterIf = exports.applyJsonPatch = exports.upsertAllBy = exports.removeWith = exports.updateWith = exports.adjustWith = exports.updateInArray = void 0;
const ramda_1 = require("ramda");
const misc_1 = require("./misc");
// Callback bubblers
const stopPropagation = (e) => e.stopPropagation();
exports.stopPropagation = stopPropagation;
const preventDefault = (e) => e.preventDefault();
exports.preventDefault = preventDefault;
const stopBubbling = (e) => {
    e.stopPropagation();
    e.preventDefault();
};
exports.stopBubbling = stopBubbling;
// State hook initializers
exports.emptyArr = [];
exports.emptyObj = {};
const getTypedEmptyArr = () => exports.emptyArr;
exports.getTypedEmptyArr = getTypedEmptyArr;
// Functional programming helpers
const pluck = (key) => (obj) => obj[key];
exports.pluck = pluck;
const isTruthy = (x) => !!x;
exports.isTruthy = isTruthy;
const isFalse = (x) => !x;
exports.isFalse = isFalse;
const exists = (x) => x !== undefined;
exports.exists = exists;
const noop = () => { };
exports.noop = noop;
exports.isNilOrEmpty = (0, ramda_1.either)(ramda_1.isNil, ramda_1.isEmpty);
exports.arrayIfNil = (0, ramda_1.when)(ramda_1.isNil, (0, ramda_1.always)(exports.emptyArr));
exports.stringIfNil = (0, ramda_1.when)(ramda_1.isNil, (0, ramda_1.always)(''));
exports.arrayIfEmpty = (0, ramda_1.when)(ramda_1.isEmpty, (0, ramda_1.always)(exports.emptyArr));
exports.arrayIfNilOrEmpty = (0, ramda_1.when)((0, ramda_1.either)(ramda_1.isNil, ramda_1.isEmpty), (0, ramda_1.always)(exports.emptyArr));
exports.objIfNilOrEmpty = (0, ramda_1.when)((0, ramda_1.either)(ramda_1.isNil, ramda_1.isEmpty), (0, ramda_1.always)(exports.emptyObj));
// Works for arrays and strings.  All other types return false.
const notEmpty = (arr) => !!(arr && arr.length);
exports.notEmpty = notEmpty;
const hasKeys = (obj) => {
    if (!(obj instanceof Object)) {
        return false;
    }
    return Object.keys(obj).length > 0;
};
exports.hasKeys = hasKeys;
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
exports.compose = compose;
const pipe = (...fns) => (0, exports.compose)(...fns.reverse());
exports.pipe = pipe;
const pick = (key) => (obj) => obj[key];
exports.pick = pick;
// Project the keys from the array of objects and rename them at the same time
// Ex:
// const values = [{ a: 123, b: 456 }, { c: 555 }]
// const mappings = { first: 'a', second: 'b', third: 'c' }
// projectAs(mappings, values) -> [{ first: 123, second: 456 }, { third: 555 }]
exports.projectAs = (0, ramda_1.curry)((mappings, arr) => arr.map((obj) => Object.keys(mappings).reduce((accum, destKey) => {
    const srcKey = mappings[destKey];
    if ((0, exports.exists)(obj === null || obj === void 0 ? void 0 : obj[srcKey])) {
        accum[destKey] = obj[srcKey];
    }
    return accum;
}, {})));
// Transparently inject side-effects in a functional composition "chain".
// Ex: const value = await somePromise.then(tap(x => console.log))
// Ex: compose(fn1, fn2, fn3, tap(log), fn4)(value)
const tap = (fn) => (arg) => {
    fn(arg);
    return arg;
};
exports.tap = tap;
const mergeKey = (srcObj, destObj = {}, key) => {
    const clonedObj = Object.assign({}, destObj);
    if (srcObj[key] !== undefined) {
        clonedObj[key] = srcObj[key];
    }
    return clonedObj;
};
exports.mergeKey = mergeKey;
const pickMultiple = (...keys) => (obj) => keys.reduce((accum, key) => (0, exports.mergeKey)(obj, accum, key), {});
exports.pickMultiple = pickMultiple;
const filterFields = (...keys) => (obj) => Object.keys(obj).reduce((accum, key) => (keys.includes(key) ? accum : (0, exports.mergeKey)(obj, accum, key)), {});
exports.filterFields = filterFields;
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
const setStateLens = (value, paths) => (state) => {
    return setObjLens(state, value, paths);
};
exports.setStateLens = setStateLens;
const range = (start, end) => {
    const arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
};
exports.range = range;
// Returns a new array without the specified item
exports.except = (0, ramda_1.curry)((item, arr) => {
    return (0, ramda_1.remove)(arr.indexOf(item), 1, arr);
});
// Converts from { foo: 'bar' } to [{ key: 'foo', value: 'bar' }]
const objToKeyValueArr = (obj = {}) => Object.entries(obj).map(([key, value]) => ({ key, value }));
exports.objToKeyValueArr = objToKeyValueArr;
// Converts from [{ key: 'foo', value: 'bar' }] to { foo: 'bar' }
const keyValueArrToObj = (arr = []) => arr.reduce((accum, { key, value }) => {
    accum[key] = value;
    return accum;
}, {});
exports.keyValueArrToObj = keyValueArrToObj;
/**
 * Converts a dot notation string to a path array
 * @example
 * dotStrPathToArr('boo.0.foo') => ['boo', 0, 'foo']
 */
exports.dotStrPathToArr = (0, misc_1.memoize)((str) => str === null || str === void 0 ? void 0 : str.split('.').map((segment) => ((0, misc_1.isNumeric)(segment) ? +segment : segment)));
exports.assocPathStr = (0, ramda_1.curry)((str, val, obj) => (0, ramda_1.assocPath)((0, exports.dotStrPathToArr)(str), val, obj));
exports.dissocPathStr = (0, ramda_1.curry)((str, obj) => (0, ramda_1.dissocPath)((0, exports.dotStrPathToArr)(str), obj));
exports.hasPathStr = (0, ramda_1.curry)((str, obj) => (0, ramda_1.hasPath)((0, exports.dotStrPathToArr)(str), obj));
exports.pathStr = (0, ramda_1.curry)((str, obj) => (0, ramda_1.path)((0, exports.dotStrPathToArr)(str), obj));
exports.pathStrOr = (0, ramda_1.curry)((defaultValue, str, obj) => (0, ramda_1.pathOr)(defaultValue, (0, exports.dotStrPathToArr)(str), obj));
exports.pathStrOrNull = (0, ramda_1.curry)((str, obj) => (0, ramda_1.pathOr)(null, (0, exports.dotStrPathToArr)(str), obj));
exports.pathEqStr = (0, ramda_1.curry)((str, val, obj) => (0, ramda_1.pathEq)((0, exports.dotStrPathToArr)(str), val, obj));
exports.lensPathStr = (0, ramda_1.curry)((str, val) => (0, ramda_1.lens)((0, exports.dotStrPathToArr)(str), val));
// I didn't see anything in Ramda that would allow me to create a "Maybe"
// composition so creating a simple version here.
// With long chains of functions it can get annoying to make sure each one
// contains a valid value before continuing.  This HOF performs a pipe but
// only when each function returns something truthy.
const pipeWhenTruthy = (...fns) => (arg) => {
    if (!(0, exports.isTruthy)(arg)) {
        return null;
    }
    const [head, ...tail] = fns;
    if (!head) {
        return arg;
    }
    const result = head(arg);
    if (tail.length > 0) {
        if (!(0, exports.isTruthy)(result)) {
            return null;
        }
        return (0, exports.pipeWhenTruthy)(...tail)(result);
    }
    return result;
};
exports.pipeWhenTruthy = pipeWhenTruthy;
// Converts an array of items to a map/dictionary/assocArray form.
// Useful when an array needs to be indexed by a key from each of the itmes.
exports.arrToObjByKey = (0, ramda_1.curry)((key, arr) => arr.reduce((accum, item) => {
    accum[item[key]] = item;
    return accum;
}, {}));
// {a: 1, b: 2, c: 3} to "a=1,b=2,c=3"
const objToCommaSeperatedString = (obj) => {
    if (!(obj instanceof Object)) {
        return obj;
    }
    return Object.keys(obj)
        .reduce((prev, key) => prev + `${key}=${obj[key]},`, '')
        .slice(0, -1);
};
exports.objToCommaSeperatedString = objToCommaSeperatedString;
const ensureArray = (maybeArr) => maybeArr && maybeArr instanceof Array ? maybeArr : [maybeArr];
exports.ensureArray = ensureArray;
const ensureArrayHandleNull = (maybeArr) => (maybeArr === null ? [] : (0, exports.ensureArray)(maybeArr));
exports.ensureArrayHandleNull = ensureArrayHandleNull;
exports.ensureFunction = (0, misc_1.memoize)((maybeFunc) => (...args) => {
    if (typeof maybeFunc === 'function') {
        return maybeFunc(...args);
    }
    return maybeFunc;
});
const maybeFnOrNull = (fn) => (value) => value ? fn(value) : null;
exports.maybeFnOrNull = maybeFnOrNull;
// Create a function that compares a value against multiple predicate functions,
// returning the first 'literal' from the matching predicate pair.
// If none match, then undefined is returned.
// (...[predicateFn, literal]) -> value -> literal
const condLiteral = (...conds) => (value) => {
    for (let i = 0; i < conds.length; i++) {
        const [pred, literal] = conds[i];
        if (pred(value)) {
            return literal;
        }
    }
};
exports.condLiteral = condLiteral;
// Update an object in an array using a predicateFn and an updateFn.
//
// updateInArray :: (obj -> Boolean) -> (obj -> obj) -> arr -> arr
//
// Ex: updateInArray(
//   obj => obj.id === id,
//   obj => ({ ...obj, name: 'changed' }),
//   arr
// )
exports.updateInArray = (0, ramda_1.curry)((predicateFn, updateFn, arr) => arr.map((item) => (predicateFn(item) ? updateFn(item) : item)));
// Like `updateInArray` but stops after finding the element to update
// Also like ramda `adjust` but using a predicateFn
exports.adjustWith = (0, ramda_1.curry)((predicateFn, updateFn, arr) => (0, ramda_1.adjust)((0, ramda_1.findIndex)(predicateFn, arr), updateFn, arr));
// Like ramda `update` but using a predicateFn
exports.updateWith = (0, ramda_1.curry)((predicateFn, newValue, arr) => (0, ramda_1.update)((0, ramda_1.findIndex)(predicateFn, arr), newValue, arr));
// Remove an item from an array using a predicateFn
exports.removeWith = (0, ramda_1.curry)((predicateFn, arr) => (0, ramda_1.remove)((0, ramda_1.findIndex)(predicateFn, arr), 1, arr));
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
exports.upsertAllBy = (0, ramda_1.curry)(function upsertAllBy(predicateFn, newItems, targetArr) {
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
exports.applyJsonPatch = (0, ramda_1.curry)((patch, obj) => {
    const { op, path, value } = patch;
    // assocPath requires array indexes to be integer not string
    const convertIntsToInts = (n) => (!isNaN(n) ? parseInt(n, 10) : n);
    const pathParts = path.split('/').slice(1).map(convertIntsToInts);
    if (op === 'replace') {
        return (0, ramda_1.assocPath)(pathParts, value, obj);
    }
    return obj;
});
// Perform a filter on the provided array if the passed boolean is truthy
exports.filterIf = (0, ramda_1.curry)((cond, fn, items) => (cond ? (0, ramda_1.filter)(fn, items) : items));
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
const switchCase = (casesObj, defaultValue) => (input) => casesObj.hasOwnProperty(input) ? casesObj[input] : defaultValue;
exports.switchCase = switchCase;
// Typically used for forms with optional fields to ensure empty string values etc are not passed
const onlyDefinedValues = (obj) => (0, ramda_1.reject)((val) => ['', undefined, null].includes(val))(obj);
exports.onlyDefinedValues = onlyDefinedValues;
/**
 * Given a "params" object with single values or arrays of values, returns an array with all the
 * possible permutations of the params as a single value params
 * @example
 *
 * paramsCartesianProduct({
 * 	clusterId: ['foo', 'bar'],
 * 	namespace: 'test'
 * })
 * // Result
 * [
 *  { clusterId: "foo", namespace: "test" }
 *  { clusterId: "bar", namespace: "test" }
 * ]
 *
 * @param params
 */
function paramsCartesianProduct(params) {
    const objEntries = Object.entries(params);
    const cartesianMerge = (0, ramda_1.liftN)(objEntries.length, (...args) => (0, ramda_1.mergeAll)(args));
    const isolatedParamsArr = objEntries.map(([key, value]) => {
        if (Array.isArray(value)) {
            return value.map((v) => ({ [key]: v }));
        }
        return [{ [key]: value }];
    });
    // @ts-ignore
    return isolatedParamsArr.length ? cartesianMerge(...isolatedParamsArr) : [params];
}
exports.paramsCartesianProduct = paramsCartesianProduct;
//# sourceMappingURL=fp.js.map