import {
  adjust,
  always,
  assocPath,
  either,
  filter,
  findIndex,
  hasPath,
  isEmpty,
  isNil,
  path,
  pathEq,
  pathOr,
  reject,
  remove,
  update,
  when,
  curry,
  lens,
  dissocPath,
} from 'ramda'
import { isNumeric, memoize } from './misc'

// Callback bubblers
export const stopPropagation = (e) => e.stopPropagation()
export const preventDefault = (e) => e.preventDefault()
export const stopBubbling = (e) => {
  e.stopPropagation()
  e.preventDefault()
}

// State hook initializers

export const emptyArr = []
export const emptyObj = {}

export const getTypedEmptyArr = <T>() => emptyArr as T[]

// Functional programming helpers

export const pluck = (key) => (obj) => obj[key]
export const isTruthy = (x) => !!x
export const isFalse = (x) => !x
export const exists = (x) => x !== undefined
export const noop = () => {}
export const isNilOrEmpty = either(isNil, isEmpty)
export const arrayIfNil = when(isNil, always(emptyArr))
export const stringIfNil = when(isNil, always(''))
export const arrayIfEmpty = when(isEmpty, always(emptyArr))
export const arrayIfNilOrEmpty = when(either(isNil, isEmpty), always(emptyArr))
export const objIfNilOrEmpty = when(either(isNil, isEmpty), always(emptyObj))

// Works for arrays and strings.  All other types return false.
export const notEmpty = (arr) => !!(arr && arr.length)

export const hasKeys = (obj) => {
  if (!(obj instanceof Object)) {
    return false
  }
  return Object.keys(obj).length > 0
}

export const compose = (...fns) =>
  fns.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args)),
  )
export const pipe = (...fns) => compose(...fns.reverse())
export const pick = (key) => (obj) => obj[key]

// Project the keys from the array of objects and rename them at the same time
// Ex:
// const values = [{ a: 123, b: 456 }, { c: 555 }]
// const mappings = { first: 'a', second: 'b', third: 'c' }
// projectAs(mappings, values) -> [{ first: 123, second: 456 }, { third: 555 }]
export const projectAs = curry((mappings, arr) =>
  arr.map((obj) =>
    Object.keys(mappings).reduce((accum, destKey) => {
      const srcKey = mappings[destKey]
      if (exists(obj?.[srcKey])) {
        accum[destKey] = obj[srcKey]
      }
      return accum
    }, {}),
  ),
)

// Transparently inject side-effects in a functional composition "chain".
// Ex: const value = await somePromise.then(tap(x => console.log))
// Ex: compose(fn1, fn2, fn3, tap(log), fn4)(value)
export const tap = (fn) => (arg) => {
  fn(arg)
  return arg
}

export const mergeKey = (srcObj, destObj = {}, key) => {
  const clonedObj = { ...destObj }
  if (srcObj[key] !== undefined) {
    clonedObj[key] = srcObj[key]
  }
  return clonedObj
}

export const pickMultiple =
  (...keys) =>
  (obj) =>
    keys.reduce((accum, key) => mergeKey(obj, accum, key), {})

export const filterFields =
  (...keys) =>
  (obj) =>
    Object.keys(obj).reduce(
      (accum, key) => (keys.includes(key) ? accum : mergeKey(obj, accum, key)),
      {},
    )

// Lens-style setter useful for setState operations
// Allows for setting of values in a deeply nested object using cloning.
// We can extend with other functionality like arrays and using
// functions as selectors in the future if it looks like it will be useful.
export function setObjLens(obj, value, paths) {
  const [head, ...tail] = paths
  if (tail.length === 0) {
    return { ...obj, [head]: value }
  }
  return {
    ...obj,
    [head]: setObjLens(obj[head], value, tail),
  }
}

export const setStateLens = (value, paths) => (state) => {
  return setObjLens(state, value, paths)
}

export const range = (start, end) => {
  const arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}

// Returns a new array without the specified item
export const except = curry((item, arr) => {
  return remove(arr.indexOf(item), 1, arr)
})

// Converts from { foo: 'bar' } to [{ key: 'foo', value: 'bar' }]
export const objToKeyValueArr = (obj = {}) =>
  Object.entries(obj).map(([key, value]) => ({ key, value }))

// Converts from [{ key: 'foo', value: 'bar' }] to { foo: 'bar' }
export const keyValueArrToObj = (arr = []) =>
  arr.reduce((accum, { key, value }) => {
    accum[key] = value
    return accum
  }, {})

/**
 * Converts a dot notation string to a path array
 * @example
 * dotStrPathToArr('boo.0.foo') => ['boo', 0, 'foo']
 */
export const dotStrPathToArr = memoize((str) =>
  str?.split('.').map((segment) => (isNumeric(segment) ? +segment : segment)),
)
export const assocPathStr = curry((str, val, obj) => assocPath(dotStrPathToArr(str), val, obj))
export const dissocPathStr = curry((str, obj) => dissocPath(dotStrPathToArr(str), obj))
export const hasPathStr = curry((str, obj) => hasPath(dotStrPathToArr(str), obj))
export const pathStr = curry((str, obj) => path(dotStrPathToArr(str), obj))
export const pathStrOr = curry((defaultValue, str, obj) =>
  pathOr(defaultValue, dotStrPathToArr(str), obj),
)
export const pathStrOrNull = curry((str, obj) => pathOr(null, dotStrPathToArr(str), obj))
export const pathEqStr = curry((str, val, obj) => pathEq(dotStrPathToArr(str), val, obj))
export const lensPathStr = curry((str, val) => lens(dotStrPathToArr(str), val))

// I didn't see anything in Ramda that would allow me to create a "Maybe"
// composition so creating a simple version here.
// With long chains of functions it can get annoying to make sure each one
// contains a valid value before continuing.  This HOF performs a pipe but
// only when each function returns something truthy.
export const pipeWhenTruthy =
  (...fns) =>
  (arg) => {
    if (!isTruthy(arg)) {
      return null
    }
    const [head, ...tail] = fns
    if (!head) {
      return arg
    }
    const result = head(arg)
    if (tail.length > 0) {
      if (!isTruthy(result)) {
        return null
      }
      return pipeWhenTruthy(...tail)(result)
    }
    return result
  }

// Converts an array of items to a map/dictionary/assocArray form.
// Useful when an array needs to be indexed by a key from each of the itmes.
export const arrToObjByKey = curry((key, arr) =>
  arr.reduce((accum, item) => {
    accum[item[key]] = item
    return accum
  }, {}),
)

// {a: 1, b: 2, c: 3} to "a=1,b=2,c=3"
export const objToCommaSeperatedString = (obj) => {
  if (!(obj instanceof Object)) {
    return obj
  }
  return Object.keys(obj)
    .reduce((prev, key) => prev + `${key}=${obj[key]},`, '')
    .slice(0, -1)
}

export const ensureArray = <T>(maybeArr: T[] | T): T[] =>
  maybeArr && maybeArr instanceof Array ? (maybeArr as T[]) : [maybeArr as T]

export const ensureArrayHandleNull = (maybeArr) => (maybeArr === null ? [] : ensureArray(maybeArr))

export const ensureFunction = memoize((maybeFunc) => (...args) => {
  if (typeof maybeFunc === 'function') {
    return maybeFunc(...args)
  }
  return maybeFunc
})

export const maybeFnOrNull = (fn) => (value) => value ? fn(value) : null

// Create a function that compares a value against multiple predicate functions,
// returning the first 'literal' from the matching predicate pair.
// If none match, then undefined is returned.
// (...[predicateFn, literal]) -> value -> literal
export const condLiteral =
  (...conds) =>
  (value) => {
    for (let i = 0; i < conds.length; i++) {
      const [pred, literal] = conds[i]
      if (pred(value)) {
        return literal
      }
    }
  }

// Update an object in an array using a predicateFn and an updateFn.
//
// updateInArray :: (obj -> Boolean) -> (obj -> obj) -> arr -> arr
//
// Ex: updateInArray(
//   obj => obj.id === id,
//   obj => ({ ...obj, name: 'changed' }),
//   arr
// )
export const updateInArray = curry((predicateFn, updateFn, arr) =>
  arr.map((item) => (predicateFn(item) ? updateFn(item) : item)),
)

// Like `updateInArray` but stops after finding the element to update
// Also like ramda `adjust` but using a predicateFn
export const adjustWith = curry((predicateFn, updateFn, arr) =>
  adjust(findIndex(predicateFn, arr), updateFn, arr),
)

// Like ramda `update` but using a predicateFn
export const updateWith = curry((predicateFn, newValue, arr) =>
  update(findIndex(predicateFn, arr), newValue, arr),
)

// Remove an item from an array using a predicateFn
export const removeWith = curry((predicateFn, arr) => remove(findIndex(predicateFn, arr), 1, arr))

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
export const upsertAllBy = curry(function upsertAllBy<T>(
  predicateFn: (item: T) => string | number,
  newItems: T[],
  targetArr: T[],
): T[] {
  const itemsMap = new Map<string | number, T>()
  for (const item of targetArr) {
    itemsMap.set(predicateFn(item), item)
  }
  for (const item of newItems) {
    const key = predicateFn(item)
    itemsMap.set(key, { ...((itemsMap.get(key) || emptyObj) as T), ...item })
  }
  return Array.from(itemsMap.values())
})

// applyJsonPatch :: oldObject -> patch -> newObject
export const applyJsonPatch = curry((patch, obj) => {
  const { op, path, value } = patch

  // assocPath requires array indexes to be integer not string
  const convertIntsToInts = (n) => (!isNaN(n) ? parseInt(n, 10) : n)

  const pathParts = path.split('/').slice(1).map(convertIntsToInts)
  if (op === 'replace') {
    return assocPath(pathParts, value, obj)
  }
  return obj
})

// Perform a filter on the provided array if the passed boolean is truthy
export const filterIf = curry((cond, fn, items) => (cond ? filter(fn, items) : items))

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
export const switchCase = (casesObj, defaultValue?) => (input) =>
  casesObj.hasOwnProperty(input) ? casesObj[input] : defaultValue

// Typically used for forms with optional fields to ensure empty string values etc are not passed
export const onlyDefinedValues = (obj) =>
  reject<any>((val) => ['', undefined, null].includes(val))(obj)

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
