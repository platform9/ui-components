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
