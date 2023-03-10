import React, { useReducer, useCallback, ReactNode, Reducer, useEffect } from 'react'
import Downshift, { ControllerStateAndHelpers, DownshiftProps } from 'downshift'
import { emptyArr } from 'src/utils/fp'
import { equals, uniq, includes } from 'ramda'

type OnClickHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => void

interface DownshiftChildrenProps<T> extends ControllerStateAndHelpers<T> {
  getRemoveButtonProps: (args: { onClick: OnClickHandler; item: T }) => { onClick: OnClickHandler }
  toggleItem: (item: T) => void
  selectItem: (item: T) => void
  unselectItem: (item: T) => void
  selectedItems: T[]
  selectAll: (items: T[]) => void
  clear: () => void
}

export interface MultiDownshiftProps<T> extends DownshiftProps<T> {
  children: (props: DownshiftChildrenProps<T>) => ReactNode
  onMultiChange: (items: T[]) => void
  selectedItems?: T[]
  isControlled?: boolean
}

const stateReducer = (state, changes) => {
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
      return {
        ...changes,
        highlightedIndex: state.highlightedIndex,
        isOpen: true,
        inputValue: '',
      }
    default:
      return changes
  }
}

interface DownshiftReducerAction<T> {
  type: 'toggleItem' | 'select' | 'deselect' | 'set' | 'clear'
  payload?: T | T[]
}

const remove = (selectedItems, item) => {
  return selectedItems.filter((selectedItem) => !equals(selectedItem, item))
}

function dropdownReducer<T>(selectedItems: T[], { type, payload }: DownshiftReducerAction<T>) {
  switch (type) {
    case 'toggleItem':
      if (!Array.isArray(payload) && includes(payload, selectedItems)) {
        return remove(selectedItems, payload)
      }
      return [...selectedItems, payload]
    case 'select':
      return uniq([...selectedItems, payload])
    case 'deselect':
      return remove(selectedItems, payload)
    case 'set':
      return Array.isArray(payload) ? payload : emptyArr
    case 'clear':
    default:
      return emptyArr
  }
}

export default function MultiDownshift<T>({
  children,
  onMultiChange,
  selectedItems,
  isControlled = !!selectedItems,
  ...props
}: MultiDownshiftProps<T>) {
  const [locallySelectedItems, dispatch] = useReducer<Reducer<T[], DownshiftReducerAction<T>>>(
    dropdownReducer,
    selectedItems || (emptyArr as T[]),
  )

  useEffect(() => {
    // This should only happen when locally selected
    // items are out of sync (ie changed by an external agent)
    if (isControlled && !equals(selectedItems, locallySelectedItems)) {
      dispatch({ type: 'set', payload: selectedItems })
    }
  }, [selectedItems])

  useEffect(() => {
    if (!isControlled || !equals(selectedItems, locallySelectedItems)) {
      onMultiChange && onMultiChange(locallySelectedItems)
    }
  }, [locallySelectedItems])

  const toggleItem = useCallback((item) => {
    dispatch({ type: 'toggleItem', payload: item })
  }, [])
  const selectItem = useCallback((item) => {
    dispatch({ type: 'select', payload: item })
  }, [])
  const selectAll = useCallback((items) => {
    dispatch({ type: 'set', payload: items })
  }, [])
  const unselectItem = useCallback((item) => {
    dispatch({ type: 'deselect', payload: item })
  }, [])
  const clear = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  const getRemoveButtonProps = useCallback(
    ({ onClick = undefined, item = undefined, ...props } = {}) => {
      return {
        onClick: (e) => {
          // TODO: use something like downshift's composeEventHandlers utility instead
          onClick && onClick(e)
          e.stopPropagation()
          unselectItem(item)
        },
        ...props,
      }
    },
    [],
  )

  const getStateAndHelpers = useCallback(
    (downshift: ControllerStateAndHelpers<T>): DownshiftChildrenProps<T> => {
      return {
        getRemoveButtonProps,
        toggleItem,
        selectItem,
        unselectItem,
        selectAll,
        clear,
        selectedItems: locallySelectedItems,
        ...downshift,
      }
    },
    [locallySelectedItems],
  )
  return (
    <Downshift<T> {...props} stateReducer={stateReducer} onChange={toggleItem} selectedItem={null}>
      {(downshift) => children(getStateAndHelpers(downshift))}
    </Downshift>
  )
}
