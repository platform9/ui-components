export declare const clearDebounceMemory: (fn: (...args: any[]) => any) => void;
export interface CancellableDebounceFn<T extends unknown[] = unknown[]> {
    (...args: T): void;
    cancel: () => void;
    cancelled: boolean;
}
export declare function debounce<T extends unknown[], U>(fn: (...args: T) => U | PromiseLike<U>, ms?: number, setTimeout?: typeof globalThis.setTimeout): CancellableDebounceFn<T>;
