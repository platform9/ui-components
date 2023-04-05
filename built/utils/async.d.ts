/// <reference types="ts-toolbelt" />
export declare const pluckAsync: import("Function/Curry").Curry<(key: any, promise: any) => any>;
export declare const pipeAsync: (...fns: any[]) => (params: any) => Promise<any>;
export declare const mapAsync: import("Function/Curry").Curry<(callback: any, arr: any) => Promise<any[]>>;
export declare const flatMapAsync: import("Function/Curry").Curry<(callback: any, arr: any) => Promise<any[]>>;
export declare const tryCatchAsync: import("Function/Curry").Curry<(tryer: any, catcher: any, input: any) => Promise<any>>;
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
export declare const propsAsync: (objPromises: any) => Promise<{
    [index: string]: unknown;
}>;
/**
 * Like Promise.all but it won't reject if any (or all) of the promises are rejected
 * and it will always fullfill by returning an array with the successful results
 * An error handler function can be provided to deal with promise rejections individually
 * @param promises
 * @param [errorHandler] Function that can be used to handle the rejected promises
 * @returns {Promise<[*,...]>}
 */
export declare const someAsync: <T>(promises: Promise<T>[], errorHandler?: (err: any) => void) => Promise<T[]>;
export declare const sleep: (ms: any) => Promise<void>;
export declare const clearDebounceMemory: (fn: (...args: any[]) => any) => void;
export interface CancellableDebounceFn<T extends unknown[] = unknown[]> {
    (...args: T): void;
    cancel: () => void;
    cancelled: boolean;
}
export declare function debounce<T extends unknown[], U>(fn: (...args: T) => U | PromiseLike<U>, ms?: number, setTimeout?: typeof globalThis.setTimeout): CancellableDebounceFn<T>;
export declare function throttle(callback: any, limit: any): () => void;
