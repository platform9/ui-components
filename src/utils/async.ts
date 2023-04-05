import { curry, flatten, fromPairs, mapObjIndexed } from 'ramda'
import { ensureArray } from './fp'

export const pluckAsync = curry((key, promise) => promise.then((obj) => obj[key]))

// eslint-disable-next-line @typescript-eslint/require-await
export const pipeAsync =
  (...fns) =>
  async (params) =>
    fns.reduce(async (prevPromise, nextCb) => nextCb(await prevPromise), params)

export const mapAsync = curry(async (callback, arr) => {
  return Promise.all(arr.map((val, i) => callback(val, i, arr)))
})

export const flatMapAsync = curry(async (callback, arr) => {
  return flatten(
    await Promise.all(arr.map(async (val, i) => ensureArray(await callback(val, i, arr)))),
  )
})

// Functional async try catch
export const tryCatchAsync = curry(async (tryer, catcher, input) => {
  try {
    return await tryer(input)
  } catch (e) {
    return catcher(e)
  }
})

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
export const propsAsync = async (objPromises) => {
  // TODO: Fix Typings
  const promises = Object.values(
    mapObjIndexed(async (promise, key) => [key, await promise], objPromises),
  )
  const results = await Promise.all(promises)

  // @ts-ignore
  return fromPairs(results)
}

/**
 * Like Promise.all but it won't reject if any (or all) of the promises are rejected
 * and it will always fullfill by returning an array with the successful results
 * An error handler function can be provided to deal with promise rejections individually
 * @param promises
 * @param [errorHandler] Function that can be used to handle the rejected promises
 * @returns {Promise<[*,...]>}
 */
export const someAsync = async <T>(
  promises: Array<Promise<T>>,
  errorHandler = (err) => console.warn(err),
): Promise<T[]> => {
  const results = await Promise.all(
    promises.map(async (promise) => {
      try {
        return [await promise]
      } catch (err) {
        errorHandler(err)
        return null
      }
    }),
  )
  // Return only the successful results
  return results.filter(Array.isArray).map(([firstItem]) => firstItem)
}

export const sleep = async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

const timeoutMap = new Map<Function, NodeJS.Timeout>()

export const clearDebounceMemory = (fn: (...args: any[]) => any) => {
  if (timeoutMap.has(fn)) {
    const id = timeoutMap.get(fn)
    clearTimeout(id)
  }
}

export interface CancellableDebounceFn<T extends unknown[] = unknown[]> {
  (...args: T): void
  cancel: () => void
  cancelled: boolean
}

export function debounce<T extends unknown[], U>(
  fn: (...args: T) => U | PromiseLike<U>,
  ms = 500,
  setTimeout = global.setTimeout,
): CancellableDebounceFn<T> {
  let id: NodeJS.Timeout
  const debouncedFn = async (...args: T): Promise<U> => {
    clearDebounceMemory(fn)
    return new Promise((resolve) => {
      id = setTimeout(() => {
        timeoutMap.delete(fn)
        resolve(fn(...args))
      }, ms)
      timeoutMap.set(fn, id)
    })
  }
  debouncedFn.cancel = () => {
    clearTimeout(id)
    debouncedFn.cancelled = true
  }
  debouncedFn.cancelled = false
  return debouncedFn
}

export function throttle(callback, limit) {
  let waiting = false
  return function () {
    if (!waiting) {
      callback.apply(this, arguments)
      waiting = true
      setTimeout(function () {
        waiting = false
      }, limit)
    }
  }
}
