import { useEffect, useRef } from 'react'

type ICallback = () => void

const useInterval = (callback: ICallback, delay = 0): void => {
  const savedCallbackRef = useRef<ICallback>(callback)
  const intervalIdRef = useRef<NodeJS.Timer>()

  useEffect((): void => {
    savedCallbackRef.current = callback
  }, [callback])

  useEffect(() => {
    intervalIdRef.current && clearInterval(intervalIdRef.current)
    if (delay != null) {
      intervalIdRef.current = setInterval(() => {
        savedCallbackRef.current()
      }, delay)
    }
    return () => intervalIdRef.current && clearInterval(intervalIdRef.current)
  }, [delay])
}

export default useInterval
