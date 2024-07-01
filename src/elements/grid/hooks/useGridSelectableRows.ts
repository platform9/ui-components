/* eslint-disable react-hooks/rules-of-hooks */
import { difference, equals } from 'ramda'
import {
  FC,
  ReactNode,
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { emptyArr, isNilOrEmpty, noop } from '../../..//utils/fp'
import { memoize } from '../../../utils/misc'
import GridDefaultActionButton from '../buttons/GridDefaultActionButton'
import { ParsedGridRow } from './useGridRows'

export interface GridBatchActionsConfig<T> {
  multiSelection?: boolean
  disableRowSelection?: boolean
  rowIsSelectableFn?: (item: T) => boolean
  selectedItems?: T[]
  onSelectChange?: (selectedItems: T[]) => void
  isControlled?: boolean
  totalItems?: number
  batchActions?: Array<GridBatchActionSpec<T>>
  onRefresh?: (...args: unknown[]) => void | Promise<void>
  disabledRowTooltip?: string | React.ReactNode | ((item: T) => string | React.ReactNode)
}

export interface BatchActionButtonProps<T> {
  onClick: () => void | Promise<void>
  children: string | ReactNode
  disabled?: boolean
  icon?: string
  className?: string
}

export interface GridBatchActionSpec<T> {
  cond?: (selectedItems: T[]) => boolean
  label?: string | ReactNode
  icon?: string
  handleAction?: (selectedItems: T[]) => boolean | void | Promise<boolean | void>
  keepRowsSelected?: boolean
  refreshAfterSuccess?: boolean
  onComplete?: (success, selectedItems: T[]) => boolean | void | Promise<boolean | void>
  BatchActionButton?: FC<BatchActionButtonProps<T>>
}

export interface SelectableParsedGridRow<T> extends ParsedGridRow<T> {
  isSelected?: boolean
  isSelectable?: boolean
  multiSelection?: boolean
  toggleSelect?: () => void
  select?: () => void
  unselect?: () => void
}

export type SelectionStatus = 'all' | 'some' | 'none'

export interface GridBatchActionProps<T> {
  key: string | number
  label: string | ReactNode
  disabled: boolean
  triggerAction: () => void
  BatchActionButton: FC<BatchActionButtonProps<T>>
}

export interface GridBatchActionsProps<T> {
  batchActionsDisabled: boolean
  batchActions?: GridBatchActionProps<T>[]
  rowsSelectionDisabled: boolean
  multiSelectionEnabled?: boolean
  selectedItems?: T[]
  selectedCount?: number
  toggleSelectAll?: () => void
  clearSelectedRows?: () => void
  selectionStatus?: SelectionStatus
  disabledRowTooltip?: string | React.ReactNode | ((item: T) => string | React.ReactNode)
}

interface SelectedRowsReducerAction<T> {
  type: 'add' | 'remove' | 'toggle' | 'addSome' | 'removeSome' | 'set' | 'clear'
  payload: { row?: ParsedGridRow<T>; rows?: ParsedGridRow<T>[]; multiSelection?: boolean }
}

type SelectedRowReducer<T> = Reducer<Map<string, ParsedGridRow<T>>, SelectedRowsReducerAction<T>>

const selectedRowReducer = <T>(
  selectedRows: Map<string, ParsedGridRow<T>>,
  { type, payload: { row, rows, multiSelection } }: SelectedRowsReducerAction<T>,
) => {
  const newMap = new Map<string, ParsedGridRow<T>>(
    type === 'set' ? rows.map((row) => [row.key, row]) : selectedRows,
  )
  switch (type) {
    case 'addSome':
      rows.forEach((row) => newMap.set(row.key, row))
      break
    case 'removeSome':
      rows.forEach(({ key }) => newMap.delete(key))
      break
    case 'clear':
      newMap.clear()
      break
    case 'add':
      newMap.set(row.key, row)
      break
    case 'remove':
      newMap.delete(row.key)
      break
    case 'toggle':
      if (newMap.has(row.key)) {
        newMap.delete(row.key)
        break
      }
      if (!multiSelection) {
        newMap.clear()
      }
      newMap.set(row.key, row)
      break
  }
  return newMap
}

const maxSize = 1000000

export default function useGridSelectableRows<T>(
  rows: Array<ParsedGridRow<T>>,
  {
    batchActions: rowActionsSpec = emptyArr,
    multiSelection,
    rowIsSelectableFn,
    totalItems = rows.length,
    selectedItems,
    onSelectChange,
    isControlled = !!selectedItems,
    disableRowSelection = isNilOrEmpty(rowActionsSpec) && !isControlled,
    onRefresh,
    disabledRowTooltip = undefined,
  }: GridBatchActionsConfig<T>,
): [Array<SelectableParsedGridRow<T>>, GridBatchActionsProps<T>] {
  if (disableRowSelection) {
    return [rows, { rowsSelectionDisabled: true, batchActionsDisabled: true }]
  }
  const initialState = useMemo(() => new Map<string, ParsedGridRow<T>>(), [])
  const [selectedRows, dispatch] = useReducer<SelectedRowReducer<T>>(
    selectedRowReducer,
    initialState,
  )
  const [locallySelectedItems, setLocallySelectedItems] = useState([])

  useEffect(() => {
    setLocallySelectedItems(Array.from(selectedRows.values()).map(({ item }) => item))
  }, [selectedRows, selectedItems])

  useEffect(() => {
    // This should only happen when locally selected
    // items are out of sync (ie changed by an external agent)
    if (isControlled && !equals(selectedItems, locallySelectedItems)) {
      const selectedRows = rows.filter((row) => selectedItems.includes(row.item))
      dispatch({ type: 'set', payload: { rows: selectedRows } })
    }
  }, [selectedItems, rows])

  useEffect(() => {
    if (!isControlled || equals(selectedItems, locallySelectedItems)) return
    onSelectChange && onSelectChange(locallySelectedItems)
  }, [locallySelectedItems, onSelectChange])

  const getSelectToggler = useCallback(
    memoize(
      (row, type: 'toggle' | 'add' | 'remove') => () => {
        dispatch({ type, payload: { row, multiSelection } })
      },
      { maxSize },
    ),
    [multiSelection],
  )
  const getRowIsSelectable = useCallback(
    memoize(
      (row, isSelected) => {
        const isSelectable = rowIsSelectableFn ? rowIsSelectableFn(row.item) : true

        return {
          ...row,
          isSelectable,
          isSelected,
          multiSelection,
          toggleSelect: isSelectable ? getSelectToggler(row, 'toggle') : noop,
          select: isSelectable ? getSelectToggler(row, 'add') : noop,
          unselect: isSelectable ? getSelectToggler(row, 'remove') : noop,
        }
      },
      { maxSize },
    ),
    [multiSelection, rowIsSelectableFn],
  )
  const selectableRows = useMemo<Array<SelectableParsedGridRow<T>>>(
    () =>
      rows.map((row) => {
        const { key } = row
        const isSelected = selectedRows.has(key)
        if (isSelected) {
          // Update the existing row
          selectedRows.set(key, row)
        }
        return getRowIsSelectable(row, isSelected)
      }),
    [rows, selectedRows, getRowIsSelectable],
  )

  const toggleSelectAll = useCallback(
    (rows = selectableRows) => {
      const keys = rows.map(({ key }) => key)
      if (difference(keys, Array.from(selectedRows.keys())).length) {
        dispatch({ type: 'addSome', payload: { rows: rows.filter((r) => r.isSelectable) } })
        return
      }
      dispatch({ type: 'removeSome', payload: { rows } })
    },
    [selectableRows],
  )

  const clearSelectedRows = useCallback(() => {
    dispatch({ type: 'clear', payload: {} })
  }, [])

  const batchActions = useMemo<GridBatchActionProps<T>[]>(() => {
    if (!rowActionsSpec) {
      return emptyArr
    }
    return rowActionsSpec.map(
      (
        {
          cond,
          BatchActionButton = GridDefaultActionButton,
          label,
          keepRowsSelected,
          refreshAfterSuccess = true,
          onComplete,
          handleAction,
          icon,
        },
        idx,
      ) => ({
        key: idx,
        BatchActionButton: BatchActionButton,
        label,
        disabled: cond && locallySelectedItems.length && !cond(locallySelectedItems),
        triggerAction: async () => {
          const success = handleAction ? await handleAction(locallySelectedItems) : true
          if (success !== false) {
            if (refreshAfterSuccess && onRefresh) {
              onRefresh()
            }
            if (!keepRowsSelected) {
              dispatch({ type: 'clear', payload: {} })
            }
          }
          if (onComplete) {
            onComplete(success, locallySelectedItems)
          }
        },
        icon,
      }),
    )
  }, [rowActionsSpec, locallySelectedItems])

  const selectedCount = selectedRows.size
  const selectionStatus = selectedCount === totalItems ? 'all' : selectedCount ? 'some' : 'none'
  return [
    selectableRows,
    {
      toggleSelectAll,
      clearSelectedRows,
      selectedItems: locallySelectedItems,
      selectedCount,
      selectionStatus,
      multiSelectionEnabled: multiSelection,
      rowsSelectionDisabled: false,
      batchActionsDisabled: isNilOrEmpty(rowActionsSpec),
      batchActions,
      disabledRowTooltip,
    },
  ]
}
