import { useCallback, useMemo, useReducer, FC, Reducer } from 'react'
import { ParsedGridRow } from '../../../elements/grid/hooks/useGridRows'
import { assocPath, dissocPath, equals } from 'ramda'
import { isNilOrEmpty, emptyArr } from '../../../utils/fp'
import { memoize } from '../../../utils/misc'
import { allKey } from '../../../constants'

interface GridFilterProps<
  F extends Record<string, unknown>,
  K extends keyof F = keyof F,
  V = F[K],
> {
  key: K
  updateFilterValue: FilterValueChangeHandler<V>
  filterValue: V
  clearFilter: () => void | Promise<void>
  FilterComponent: FC<GridFilterComponentProps<V, F>>
  filterValues: F
}

export interface GridFilteringProps<
  GF extends Record<string, unknown>,
  F extends Record<string, unknown>,
> {
  clearFilters: () => void | Promise<void>
  globalFilters: GridFilterProps<GF>[]
  filters: GridFilterProps<F>[]
}

type FilterValueChangeHandler<V = unknown> = (value: V) => void | Promise<void>

export interface GridFilterComponentProps<V, F> {
  value: V
  onChange: (value: V) => void
  className?: string
  filterValues?: F
}

export interface GridGlobalFilterSpec<
  T,
  F extends Record<string, unknown>,
  FK extends keyof F = keyof F,
  FV = F[FK],
> {
  key: FK
  FilterComponent: FC<GridFilterComponentProps<FV, F>>
  initialValue?: FV
  equalityComparerFn: (item: T, filterValue: FV) => boolean
  allowEmpty?: boolean
  controlled?: boolean
  onChange?: FilterValueChangeHandler<FV>
}

export interface GridFilterSpec<
  T,
  F extends Record<string, unknown>,
  TK extends keyof T = keyof T,
  FK extends keyof F = TK extends keyof F ? TK : keyof F,
  ICV = T[TK],
  FV = F[FK],
> {
  columnKey: TK
  FilterComponent: FC<GridFilterComponentProps<FV, F>>
  initialValue?: FV
  equalityComparerFn?: (itemColValue: ICV, filterValue: FV) => boolean
  allowEmpty?: boolean
  controlled?: boolean
  onChange?: FilterValueChangeHandler<FV>
}

export interface GridFilteringConfig<
  T,
  GF extends Record<string, unknown> = Record<string, unknown>,
  F extends Record<string, unknown> = Record<string, unknown>,
> {
  filters?: GridFilterSpec<T, F>[]
  globalFilters?: Array<GridGlobalFilterSpec<T, GF>>
  onClearFilters?: () => void | Promise<void>
}

interface FilteringReducerAction {
  type: 'update' | 'clear' | 'clearAll'
  payload?: {
    key: string
    global?: boolean
    value?: any
  }
}

interface FilteringState<GF extends Record<string, unknown>, F extends Record<string, unknown>> {
  globalValuesByKey: GF
  valuesByKey: F
}

const defaultFilteringState = {
  globalValuesByKey: {},
  valuesByKey: {},
}

type FilteringReducer<
  T,
  GF extends Record<string, unknown>,
  F extends Record<string, unknown>,
  FS = FilteringState<GF, F>,
> = Reducer<FS, FilteringReducerAction>

function filteringReducer<
  GF extends Record<string, unknown>,
  F extends Record<string, unknown>,
  FS extends FilteringState<GF, F> = FilteringState<GF, F>,
>(state: FS, { type, payload: { global, key, value } }: FilteringReducerAction) {
  const basePath = global ? 'globalValuesByKey' : 'valuesByKey'
  switch (type) {
    case 'update':
      return assocPath<unknown, FS>([basePath, key], value, state)
    case 'clear':
      return dissocPath<FS>([basePath, key], state)
    case 'clearAll':
    default:
      return defaultFilteringState as FS
  }
}

export default function useGridFiltering<
  T,
  GF extends Record<string, unknown>,
  F extends Record<string, unknown>,
>(
  rows: Array<ParsedGridRow<T>>,
  {
    onClearFilters,
    globalFilters: globalFilterSpecs = emptyArr,
    filters: filterSpecs = emptyArr,
  }: GridFilteringConfig<T, GF, F>,
): [Array<ParsedGridRow<T>>, GridFilteringProps<GF, F>] {
  const initialFilteringState = useMemo<FilteringState<GF, F>>(() => {
    return {
      globalValuesByKey: globalFilterSpecs.reduce((acc, { key, initialValue }) => {
        acc[key] = initialValue
        return acc
      }, {} as GF),
      valuesByKey: filterSpecs.reduce((acc, { columnKey, initialValue }) => {
        acc[columnKey as keyof F] = initialValue
        return acc
      }, {} as F),
    }
  }, [])
  const [{ globalValuesByKey, valuesByKey }, dispatch] = useReducer<FilteringReducer<T, GF, F>>(
    filteringReducer,
    initialFilteringState,
  )
  const filterHandlers = useMemo<Record<keyof T, FilterValueChangeHandler>>(
    () =>
      filterSpecs.reduce((acc, { columnKey, onChange }) => {
        if (onChange) {
          acc[columnKey] = onChange
        }
        return acc
      }, {} as Record<keyof T, FilterValueChangeHandler>),
    [filterSpecs],
  )

  const globalFilterHandlers = useMemo<Record<keyof GF, FilterValueChangeHandler>>(
    () =>
      globalFilterSpecs.reduce((acc, { key, onChange }) => {
        if (onChange) {
          acc[key] = onChange
        }
        return acc
      }, {} as Record<keyof GF, FilterValueChangeHandler>),
    [globalFilterSpecs],
  )

  const getFilterUpdater = useCallback(
    memoize((key) => async (value) => {
      dispatch({ type: 'update', payload: { key, value } })
      if (filterHandlers[key]) {
        return filterHandlers[key](value)
      }
    }),
    [filterHandlers],
  )
  const getFilterClearFn = useCallback(
    memoize((key) => () => {
      dispatch({ type: 'clear', payload: { key } })
      if (filterHandlers[key]) {
        return filterHandlers[key](null)
      }
    }),
    [filterHandlers],
  )
  const getGlobalFilterUpdater = useCallback(
    memoize((key) => (value) => {
      dispatch({ type: 'update', payload: { key, global: true, value } })
      if (globalFilterHandlers[key]) {
        return globalFilterHandlers[key](value)
      }
    }),
    [globalFilterHandlers],
  )
  const getGlobalFilterClearFn = useCallback(
    memoize((key) => () => {
      dispatch({ type: 'clear', payload: { key, global: true } })
      if (globalFilterHandlers[key]) {
        return globalFilterHandlers[key](null)
      }
    }),
    [globalFilterHandlers],
  )
  const clearFilters = useCallback(async () => {
    dispatch({ type: 'clearAll' })
    if (onClearFilters) {
      return onClearFilters()
    }
  }, [onClearFilters])

  const globalFilteredRows = useMemo<Array<ParsedGridRow<T>>>(() => {
    return globalFilterSpecs.reduce(
      (rows, { key, controlled, equalityComparerFn = equals, allowEmpty = false }) => {
        if (
          globalValuesByKey[key] !== undefined &&
          (allowEmpty || !isNilOrEmpty(globalValuesByKey[key]))
        ) {
          if (controlled || globalValuesByKey[key] === allKey) {
            return rows
          }
          return rows.filter((row) => equalityComparerFn(row.item, globalValuesByKey[key]))
        }
        return rows
      },
      rows,
    )
  }, [globalFilterSpecs, rows, globalValuesByKey])

  const filteredRows = useMemo<Array<ParsedGridRow<T>>>(() => {
    return filterSpecs.reduce(
      (rows, { columnKey, controlled, equalityComparerFn = equals, allowEmpty = false }) => {
        if (
          valuesByKey[String(columnKey)] !== undefined &&
          (allowEmpty || !isNilOrEmpty(valuesByKey[String(columnKey)]))
        ) {
          if (controlled || valuesByKey[String(columnKey)] === allKey) {
            return rows
          }
          return rows.filter((row) =>
            // @fixme apparently TS is unable to understand that "keyof F" is equivalent to
            // "keyof T" here, so we are forced to use these ugly typecasts for now
            equalityComparerFn((row.item as any)[columnKey], valuesByKey[String(columnKey)] as any),
          )
        }
        return rows
      },
      globalFilteredRows,
    )
  }, [filterSpecs, globalFilteredRows, valuesByKey])

  const globalFilters = useMemo<GridFilterProps<GF>[]>(() => {
    return globalFilterSpecs.map(({ key, FilterComponent }) => ({
      key,
      updateFilterValue: getGlobalFilterUpdater(key),
      filterValue: globalValuesByKey[key],
      clearFilter: getGlobalFilterClearFn(key),
      filterValues: globalValuesByKey,
      FilterComponent,
    }))
  }, [globalValuesByKey])

  const filters = useMemo<GridFilterProps<F>[]>(() => {
    return filterSpecs.map(({ columnKey, FilterComponent }) => ({
      key: columnKey as keyof F,
      updateFilterValue: getFilterUpdater(columnKey),
      filterValue: valuesByKey[columnKey as keyof F],
      clearFilter: getFilterClearFn(columnKey),
      filterValues: valuesByKey,
      FilterComponent,
    }))
  }, [valuesByKey])

  return [
    filteredRows,
    {
      globalFilters,
      filters,
      clearFilters,
    },
  ]
}
