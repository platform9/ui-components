import { Reducer, useCallback, useMemo, useReducer } from 'react'
import { ParsedGridRow } from './useGridRows'
import { reverse, sort } from 'ramda'
import { pathStr } from 'src/utils/fp'

export type OrderDirection = 'asc' | 'desc'

export interface SortingState {
  orderBy: string
  orderDirection: OrderDirection
}

interface SortingReducerAction {
  type: OrderDirection | 'clear' | 'toggle'
  payload?: string
}

export interface GridSortableColumnSpec<V = unknown> {
  key: string
  disableSorting?: boolean
  sortFn?: (prevItemVal: V, nextItemVal: V) => number
}

export interface GridSortingConfig<C extends GridSortableColumnSpec = GridSortableColumnSpec> {
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
  disableSorting?: boolean
  controlledSorting?: boolean
  onSortChange?: (sortBy?: string, sortDirection?: 'asc' | 'desc') => void | Promise<void>
  columns: C[]
}

export interface GridSortingProps {
  sortingDisabled: boolean
  sortedBy?: string
  sortedDirection?: OrderDirection
  sortByFieldAsc?: (key: string) => void
  sortByFieldDesc?: (key: string) => void
  clearSorting?: () => void
  toggleSort?: (key: string) => void
}

export const defaultSortWith = (prevValue, nextValue) => (nextValue < prevValue ? -1 : 1)

export const defaultSortingState: SortingState = {
  orderBy: null,
  orderDirection: null,
}

const getNextDirection = (sortedDirection) =>
  sortedDirection === 'asc' ? 'desc' : sortedDirection === 'desc' ? null : 'asc'

const sortingReducer: Reducer<SortingState, SortingReducerAction> = (
  { orderDirection, orderBy },
  { type, payload },
) => {
  switch (type) {
    case 'asc':
      return { orderBy, orderDirection: 'asc' }
    case 'desc':
      return { orderBy, orderDirection: 'desc' }
    case 'clear':
      return defaultSortingState
    case 'toggle':
    default: {
      if (orderBy !== payload) {
        return { orderBy: payload, orderDirection: 'asc' }
      }
      const nextDirection = getNextDirection(orderDirection)
      return nextDirection
        ? {
            orderBy: orderBy,
            orderDirection: nextDirection,
          }
        : defaultSortingState
    }
  }
}

export default function useGridSorting<T, C extends GridSortableColumnSpec>(
  rows: Array<ParsedGridRow<T>>,
  {
    orderBy: initialOrderBy,
    orderDirection: initialOrderDirection,
    disableSorting: disableAllSorting,
    controlledSorting,
    onSortChange,
    columns,
  }: GridSortingConfig<C>,
): [Array<ParsedGridRow<T>>, GridSortingProps] {
  const [{ orderBy, orderDirection }, dispatch] = useReducer(sortingReducer, {
    orderBy: initialOrderBy,
    orderDirection: initialOrderDirection,
  })
  const toggleSort = useCallback(
    async (key) => {
      if (onSortChange) {
        const nextDirection = getNextDirection(orderDirection)
        await onSortChange(nextDirection ? key : null, nextDirection)
      }
      dispatch({ type: 'toggle', payload: key })
    },
    [orderDirection],
  )
  const sortByFieldAsc = useCallback(async (key) => {
    if (onSortChange) {
      await onSortChange(key, 'asc')
    }
    dispatch({ type: 'asc', payload: key })
  }, [])
  const sortByFieldDesc = useCallback(async (key) => {
    if (onSortChange) {
      await onSortChange(key, 'desc')
    }
    dispatch({ type: 'desc', payload: key })
  }, [])
  const clearSorting = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  const sortedRows = useMemo<Array<ParsedGridRow<T>>>(() => {
    if (disableAllSorting || !orderBy || controlledSorting) {
      return rows
    }
    const sortByColumn = columns.find(({ key }) => key === orderBy)
    if (!sortByColumn) {
      return rows
    }
    const { disableSorting = false, sortFn = defaultSortWith } = sortByColumn
    const sortedRows = disableSorting
      ? rows
      : sort((a, b) => sortFn(pathStr(orderBy, b.item), pathStr(orderBy, a.item)), rows)

    return orderDirection === 'desc' ? reverse(sortedRows) : sortedRows
  }, [rows, columns, disableAllSorting, controlledSorting, orderBy, orderDirection])

  if (disableAllSorting) {
    return [rows, { sortingDisabled: true }]
  }

  return [
    sortedRows,
    {
      sortedBy: orderBy,
      sortedDirection: orderDirection,
      sortByFieldAsc,
      sortByFieldDesc,
      clearSorting,
      toggleSort,
      sortingDisabled: false,
    },
  ]
}
