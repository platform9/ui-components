import { useCallback, useMemo, Reducer, useReducer, ReactNode, useEffect } from 'react'
import { ParsedGridRow, ParsedGridCell, GridColumnSpec, GridCellWidth } from './useGridRows'
import { memoize } from '../../../utils/misc'
import { difference, intersection, move, union, symmetricDifference } from 'ramda'

export interface GridManagedColumnSpec<T> extends GridColumnSpec<T> {
  key: string
  display?: boolean
  canHide?: boolean
}

export interface GridManagedColumnsConfig<
  T,
  C extends GridManagedColumnSpec<T> = GridManagedColumnSpec<T>,
> {
  disableColumnOrdering?: boolean
  columnsOrder?: string[]
  disableColumnHiding?: boolean
  visibleColumns?: string[]
  onColumnsChange?: (visibleColumnKeys: string[], orderedColumnKeys: string[]) => void
  columns: C[]
}

export interface ManagedColumnsParsedGridCell<T, V = unknown> extends ParsedGridCell<T, V> {
  visible?: boolean
}

export interface ManagedColumnsParsedGridRow<T> extends ParsedGridRow<T> {
  getCells: () => Array<ManagedColumnsParsedGridCell<T>>
}

export interface ColumnToggler {
  key: string
  label: ReactNode
  visible: boolean
  disabled: boolean
  toggleColumn: () => void
}

export interface GridManagedColumnProps {
  key: string
  label: ReactNode
  tooltip: ReactNode
  width: GridCellWidth
  visible: boolean
  changeColumnOrder: (targetIdx) => void
  toggleColumn: (key) => void
}

export interface GridManagedColumnsProps {
  columns: GridManagedColumnProps[]
  columnTogglers: ColumnToggler[]
  columnOrderingDisabled?: boolean
  columnHidingDisabled?: boolean
}

interface ColumnsState {
  orderedColumnKeys: string[]
  visibleColumnKeys: string[]
}

interface ColumnsReducerAction {
  type: 'changeOrder' | 'toggleColumn' | 'setVisibleColumnKeys' | 'setOrderedColumnKeys'
  payload: {
    key?: string
    targetIdx?: number
    columnKeys?: string[]
  }
}

const columnsReducer: Reducer<ColumnsState, ColumnsReducerAction> = (
  { visibleColumnKeys, orderedColumnKeys },
  { type, payload: { key, targetIdx, columnKeys } },
) => {
  switch (type) {
    case 'changeOrder':
      return {
        visibleColumnKeys,
        orderedColumnKeys: move<string>(
          orderedColumnKeys.indexOf(key),
          targetIdx,
          orderedColumnKeys,
        ),
      }
    case 'toggleColumn': {
      if (visibleColumnKeys.includes(key)) {
        const visibleColumnsSet = new Set<string>(visibleColumnKeys)
        visibleColumnsSet.delete(key)
        return {
          orderedColumnKeys,
          visibleColumnKeys: Array.from(visibleColumnsSet),
        }
      }
      return {
        orderedColumnKeys,
        visibleColumnKeys: [...visibleColumnKeys, key],
      }
    }
    case 'setVisibleColumnKeys':
      return {
        orderedColumnKeys,
        visibleColumnKeys: columnKeys,
      }
    case 'setOrderedColumnKeys':
    default:
      return {
        visibleColumnKeys,
        orderedColumnKeys: columnKeys,
      }
  }
}

const getColumnsOrder = ({ columnsOrder = [], columnSpecs = [] }) => {
  const keysList = columnSpecs.map(({ key }) => key)
  if (!columnsOrder) {
    return keysList
  }
  // If there is a difference between saved columns and column spec, remove columns
  // that are no longer in the spec and add in any new columns in the spec
  if (symmetricDifference(columnsOrder, keysList).length) {
    return union(intersection(columnsOrder, keysList), keysList)
  }
  return columnsOrder
}

const getVisibleColumns = ({ visibleColumns = [], columnSpecs = [], columnsOrder = [] }) => {
  const visibleKeys = columnSpecs.reduce((acc, { display = true, key }) => {
    if (display) {
      acc.push(key)
    }
    return acc
  }, [])
  if (!visibleColumns) {
    return visibleKeys
  }
  // If there is a difference between saved visible columns and visible columns from the spec,
  // remove columns that are no longer in the spec and add in any visible columns that were
  // not present in the full (visible & non-visible) saved list
  if (symmetricDifference(visibleColumns, visibleKeys).length) {
    return union(intersection(visibleColumns, visibleKeys), difference(visibleKeys, columnsOrder))
  }
  return visibleColumns
}

export default function useGridManagedColumns<T, C extends GridManagedColumnSpec<T>>(
  rows: Array<ParsedGridRow<T>>,
  {
    columns: columnSpecs,
    onColumnsChange,
    columnsOrder,
    visibleColumns,
    disableColumnOrdering,
    disableColumnHiding,
  }: GridManagedColumnsConfig<T, C>,
): [Array<ManagedColumnsParsedGridRow<T>>, GridManagedColumnsProps] {
  const initialState = useMemo(() => {
    return {
      orderedColumnKeys:
        (!disableColumnOrdering && getColumnsOrder({ columnsOrder, columnSpecs })) ||
        columnSpecs.map(({ key }) => key),
      visibleColumnKeys:
        (!disableColumnHiding &&
          getVisibleColumns({ visibleColumns, columnSpecs, columnsOrder })) ||
        columnSpecs.reduce((acc, { display = true, key }) => {
          if (disableColumnHiding || display) {
            acc.push(key)
          }
          return acc
        }, []),
    }
  }, [])

  const [{ orderedColumnKeys, visibleColumnKeys }, dispatch] = useReducer(
    columnsReducer,
    initialState,
  )

  useEffect(() => {
    if (!onColumnsChange) return
    onColumnsChange(visibleColumnKeys, orderedColumnKeys)
  }, [visibleColumnKeys, orderedColumnKeys])

  const getColumnToggler = useCallback<(key) => () => void>(
    memoize((key) => () => {
      dispatch({ type: 'toggleColumn', payload: { key } })
    }),
    [],
  )

  const getColumnReorderer = useCallback(
    memoize((key) => (targetIdx) => {
      dispatch({ type: 'changeOrder', payload: { key, targetIdx } })
    }),
    [],
  )

  const columnTogglers = useMemo<ColumnToggler[]>(() => {
    // We use "columns" to keep the original order
    return columnSpecs.map(({ key, label, display, canHide = !disableColumnHiding }) => ({
      key,
      label,
      visible: disableColumnHiding || visibleColumnKeys.includes(key),
      disabled: !canHide,
      toggleColumn: !canHide ? null : getColumnToggler(key),
    }))
  }, [columnSpecs, visibleColumnKeys, disableColumnHiding])

  const columns = useMemo<GridManagedColumnProps[]>(() => {
    return orderedColumnKeys.reduce((acc, columnKey) => {
      if (visibleColumnKeys.includes(columnKey)) {
        const columnSpec = columnSpecs.find(({ key }) => key === columnKey)
        if (!columnSpec) {
          // The following can happen when removing columns from the grid config but the user config
          // is still using the previous columns, localStorage.clear() could solve that in that case
          console.warn(`Column spec with key "${columnKey}" not found or not defined`)
          return acc
        }
        const { key, display, canHide, ...rest } = columnSpec
        acc.push({
          key,
          visible: true,
          changeColumnOrder: getColumnReorderer(key),
          toggleColumn: !canHide ? null : getColumnToggler(key),
          ...rest,
        })
      }
      return acc
    }, [])
  }, [columnSpecs, orderedColumnKeys, visibleColumnKeys])

  const parsedRows = useMemo(
    () =>
      rows.map(({ getCells: baseGetCells, ...row }) => ({
        ...row,
        getCells: () =>
          columns.map(({ key: columnKey }) => baseGetCells().find(({ key }) => key === columnKey)),
      })),
    [rows, columns],
  )

  return [
    parsedRows,
    {
      columns,
      columnTogglers,
      columnOrderingDisabled: disableColumnOrdering,
      columnHidingDisabled: disableColumnHiding,
    },
  ]
}
