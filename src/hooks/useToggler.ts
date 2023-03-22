import { useReducer, useCallback, Reducer } from 'react'
import { memoize } from '../utils/misc'

interface TogglerReducerAction {
  type: 'toggle' | 'assign'
  payload?: boolean
}

type TogglerReducer = Reducer<boolean, TogglerReducerAction>

const toggleReducer: TogglerReducer = (state: boolean, { type, payload }) => {
  switch (type) {
    case 'toggle':
      return !state
    case 'assign':
    default:
      return payload
  }
}

export default function useToggler(
  initialValue = false,
): [boolean, () => void, (boolean) => void, (boolean) => () => void] {
  const [active, dispatch] = useReducer<TogglerReducer>(toggleReducer, initialValue)
  const toggle = useCallback(
    () =>
      dispatch({
        type: 'toggle',
      }),
    [],
  )
  const setValue = useCallback(
    (value: boolean) =>
      dispatch({
        type: 'assign',
        payload: value,
      }),
    [],
  )
  const getValueSetter = useCallback(
    memoize((value: boolean) => () => setValue(value)),
    [],
  )

  return [active, toggle, setValue, getValueSetter]
}
