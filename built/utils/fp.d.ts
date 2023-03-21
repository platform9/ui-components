/// <reference types="ts-toolbelt" />
import { isEmpty } from 'ramda';
export declare const stopPropagation: (e: any) => any;
export declare const preventDefault: (e: any) => any;
export declare const stopBubbling: (e: any) => void;
export declare const emptyArr: any[];
export declare const emptyObj: {};
export declare const getTypedEmptyArr: <T>() => T[];
export declare const pluck: (key: any) => (obj: any) => any;
export declare const isTruthy: (x: any) => boolean;
export declare const isFalse: (x: any) => boolean;
export declare const exists: (x: any) => boolean;
export declare const noop: () => void;
export declare const isNilOrEmpty: typeof isEmpty;
export declare const arrayIfNil: (a: any) => any;
export declare const stringIfNil: (a: any) => any;
export declare const arrayIfEmpty: (a: unknown) => unknown;
export declare const arrayIfNilOrEmpty: (a: unknown) => unknown;
export declare const objIfNilOrEmpty: (a: unknown) => unknown;
export declare const notEmpty: (arr: any) => boolean;
export declare const hasKeys: (obj: any) => boolean;
export declare const compose: (...fns: any[]) => any;
export declare const pipe: (...fns: any[]) => any;
export declare const pick: (key: any) => (obj: any) => any;
export declare const projectAs: import("Function/Curry").Curry<(mappings: any, arr: any) => any>;
export declare const tap: (fn: any) => (arg: any) => any;
export declare const mergeKey: (srcObj: any, destObj: {}, key: any) => {};
export declare const pickMultiple: (...keys: any[]) => (obj: any) => any;
export declare const filterFields: (...keys: any[]) => (obj: any) => {};
export declare function setObjLens(obj: any, value: any, paths: any): any;
export declare const setStateLens: (value: any, paths: any) => (state: any) => any;
export declare const range: (start: any, end: any) => any[];
export declare const except: import("Function/Curry").Curry<(item: any, arr: any) => unknown[]>;
export declare const objToKeyValueArr: (obj?: {}) => {
    key: string;
    value: unknown;
}[];
export declare const keyValueArrToObj: (arr?: any[]) => any;
/**
 * Converts a dot notation string to a path array
 * @example
 * dotStrPathToArr('boo.0.foo') => ['boo', 0, 'foo']
 */
export declare const dotStrPathToArr: import("moize").Moized<(str: any) => any, Partial<{
    isDeepEqual: boolean;
    isPromise: boolean;
    isReact: boolean;
    isSerialized: boolean;
    isShallowEqual: boolean;
    matchesArg: import("moize").IsEqual;
    matchesKey: import("moize").IsMatchingKey;
    maxAge: number;
    maxArgs: number;
    maxSize: number;
    onCacheAdd: import("moize").OnCacheOperation<(str: any) => any>;
    onCacheChange: import("moize").OnCacheOperation<(str: any) => any>;
    onCacheHit: import("moize").OnCacheOperation<(str: any) => any>;
    onExpire: import("moize").OnExpire;
    profileName: string;
    serializer: import("moize").Serialize;
    transformArgs: import("moize").TransformKey;
    updateCacheForKey: import("moize").UpdateCacheForKey;
    updateExpire: boolean;
}> & Partial<{
    isDeepEqual: boolean;
    isPromise: boolean;
    isReact: boolean;
    isSerialized: boolean;
    isShallowEqual: boolean;
    matchesArg: import("moize").IsEqual;
    matchesKey: import("moize").IsMatchingKey;
    maxAge: number;
    maxArgs: number;
    maxSize: number;
    onCacheAdd: import("moize").OnCacheOperation<import("moize").Moizeable>;
    onCacheChange: import("moize").OnCacheOperation<import("moize").Moizeable>;
    onCacheHit: import("moize").OnCacheOperation<import("moize").Moizeable>;
    onExpire: import("moize").OnExpire;
    profileName: string;
    serializer: import("moize").Serialize;
    transformArgs: import("moize").TransformKey;
    updateCacheForKey: import("moize").UpdateCacheForKey;
    updateExpire: boolean;
}> & {
    maxSize: number;
} & Partial<import("./misc").DefaultMoizeOptions>>;
export declare const assocPathStr: import("Function/Curry").Curry<(str: any, val: any, obj: any) => (path: import("ramda").Path) => any>;
export declare const dissocPathStr: import("Function/Curry").Curry<(str: any, obj: any) => unknown>;
export declare const hasPathStr: import("Function/Curry").Curry<(str: any, obj: any) => boolean>;
export declare const pathStr: import("Function/Curry").Curry<(str: any, obj: any) => any>;
export declare const pathStrOr: import("Function/Curry").Curry<(defaultValue: any, str: any, obj: any) => any>;
export declare const pathStrOrNull: import("Function/Curry").Curry<(str: any, obj: any) => any>;
export declare const pathEqStr: import("Function/Curry").Curry<(str: any, val: any, obj: any) => boolean>;
export declare const lensPathStr: import("Function/Curry").Curry<(str: any, val: any) => import("ramda").Lens<unknown, unknown>>;
export declare const pipeWhenTruthy: (...fns: any[]) => (arg: any) => any;
export declare const arrToObjByKey: import("Function/Curry").Curry<(key: any, arr: any) => any>;
export declare const objToCommaSeperatedString: (obj: any) => any;
export declare const ensureArray: <T>(maybeArr: T | T[]) => T[];
export declare const ensureArrayHandleNull: (maybeArr: any) => any[];
export declare const ensureFunction: import("moize").Moized<(maybeFunc: any) => (...args: any[]) => any, Partial<{
    isDeepEqual: boolean;
    isPromise: boolean;
    isReact: boolean;
    isSerialized: boolean;
    isShallowEqual: boolean;
    matchesArg: import("moize").IsEqual;
    matchesKey: import("moize").IsMatchingKey;
    maxAge: number;
    maxArgs: number;
    maxSize: number;
    onCacheAdd: import("moize").OnCacheOperation<(maybeFunc: any) => (...args: any[]) => any>;
    onCacheChange: import("moize").OnCacheOperation<(maybeFunc: any) => (...args: any[]) => any>;
    onCacheHit: import("moize").OnCacheOperation<(maybeFunc: any) => (...args: any[]) => any>;
    onExpire: import("moize").OnExpire;
    profileName: string;
    serializer: import("moize").Serialize;
    transformArgs: import("moize").TransformKey;
    updateCacheForKey: import("moize").UpdateCacheForKey;
    updateExpire: boolean;
}> & Partial<{
    isDeepEqual: boolean;
    isPromise: boolean;
    isReact: boolean;
    isSerialized: boolean;
    isShallowEqual: boolean;
    matchesArg: import("moize").IsEqual;
    matchesKey: import("moize").IsMatchingKey;
    maxAge: number;
    maxArgs: number;
    maxSize: number;
    onCacheAdd: import("moize").OnCacheOperation<import("moize").Moizeable>;
    onCacheChange: import("moize").OnCacheOperation<import("moize").Moizeable>;
    onCacheHit: import("moize").OnCacheOperation<import("moize").Moizeable>;
    onExpire: import("moize").OnExpire;
    profileName: string;
    serializer: import("moize").Serialize;
    transformArgs: import("moize").TransformKey;
    updateCacheForKey: import("moize").UpdateCacheForKey;
    updateExpire: boolean;
}> & {
    maxSize: number;
} & Partial<import("./misc").DefaultMoizeOptions>>;
export declare const maybeFnOrNull: (fn: any) => (value: any) => any;
export declare const condLiteral: (...conds: any[]) => (value: any) => any;
export declare const updateInArray: import("Function/Curry").Curry<(predicateFn: any, updateFn: any, arr: any) => any>;
export declare const adjustWith: import("Function/Curry").Curry<(predicateFn: any, updateFn: any, arr: any) => unknown[]>;
export declare const updateWith: import("Function/Curry").Curry<(predicateFn: any, newValue: any, arr: any) => any[]>;
export declare const removeWith: import("Function/Curry").Curry<(predicateFn: any, arr: any) => unknown[]>;
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
export declare const upsertAllBy: import("Function/Curry").Curry<(<T>(predicateFn: (item: T) => string | number, newItems: T[], targetArr: T[]) => T[])>;
export declare const applyJsonPatch: import("Function/Curry").Curry<(patch: any, obj: any) => any>;
export declare const filterIf: import("Function/Curry").Curry<(cond: any, fn: any, items: any) => any>;
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
export declare const switchCase: (casesObj: any, defaultValue?: any) => (input: any) => any;
export declare const onlyDefinedValues: (obj: any) => any;
