import { assocPath, dissocPath, equals } from 'ramda'
import { FC, Reducer, useCallback, useMemo, useReducer } from 'react'
import { allKey } from '../../../constants'
import { ParsedGridRow } from '../../../elements/grid/hooks/useGridRows'
import { emptyArr, isNilOrEmpty } from '../../../utils/fp'
import { memoize } from '../../../utils/misc'

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
  label?: string
  filterComponentProps?: any
}

interface DropdownFilterValue {
  key: string
  label: string
  updateFilterValue: FilterValueChangeHandler
  value: string | { key: string; value: string }
  display: string
}

export interface GridFilteringProps<
  GF extends Record<string, unknown>,
  F extends Record<string, unknown>,
  DF extends Record<string, unknown>,
> {
  clearFilters: () => void | Promise<void>
  globalFilters: GridFilterProps<GF>[]
  filters: GridFilterProps<F>[]
  dropdownFilters?: GridFilterProps<DF>[]
  dropdownFilterValues?: DropdownFilterValue[]
  dropdownValuesByKey?: Record<string, unknown>
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

export interface GridDropdownFilterSpec<
  T,
  F extends Record<string, unknown>,
  FK extends keyof F = keyof F,
  FV = F[FK],
> {
  key?: FK
  label?: string
  FilterComponent: FC
  filterComponentProps?: any
  initialValue?: FV
  equalityComparerFn?: (item: T, filterValue: FV) => boolean
  allowEmpty?: boolean
  controlled?: boolean
  onChange?: FilterValueChangeHandler<FV>
  getOptionsFn: (items) => any[]
  filterComponentOptionsPropName: string
}

export interface GridFilteringConfig<
  T,
  GF extends Record<string, unknown> = Record<string, unknown>,
  F extends Record<string, unknown> = Record<string, unknown>,
  DF extends Record<string, unknown> = Record<string, unknown>,
> {
  filters?: GridFilterSpec<T, F>[]
  globalFilters?: Array<GridGlobalFilterSpec<T, GF>>
  onClearFilters?: () => void | Promise<void>
  dropdownFilters?: GridDropdownFilterSpec<T, DF>[]
}

interface FilteringReducerAction {
  type: 'update' | 'clear' | 'clearAll'
  payload?: {
    key: string
    global?: boolean
    dropdownFilter?: boolean
    value?: any
  }
}

interface FilteringState<
  GF extends Record<string, unknown>,
  F extends Record<string, unknown>,
  DF extends Record<string, unknown>,
> {
  globalValuesByKey: GF
  valuesByKey: F
  dropdownValuesByKey: DF
}

const defaultFilteringState = {
  globalValuesByKey: {},
  valuesByKey: {},
  dropdownValuesByKey: {},
}

type FilteringReducer<
  T,
  GF extends Record<string, unknown>,
  F extends Record<string, unknown>,
  DF extends Record<string, unknown>,
  FS = FilteringState<GF, F, DF>,
> = Reducer<FS, FilteringReducerAction>

function filteringReducer<
  GF extends Record<string, unknown>,
  F extends Record<string, unknown>,
  DF extends Record<string, unknown>,
  FS extends FilteringState<GF, F, DF> = FilteringState<GF, F, DF>,
>(state: FS, { type, payload: { global, dropdownFilter, key, value } }: FilteringReducerAction) {
  const basePath = global
    ? 'globalValuesByKey'
    : dropdownFilter
    ? 'dropdownValuesByKey'
    : 'valuesByKey'
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
  DF extends Record<string, unknown>,
>(
  rows: Array<ParsedGridRow<T>>,
  {
    onClearFilters,
    globalFilters: globalFilterSpecs = emptyArr,
    filters: filterSpecs = emptyArr,
    dropdownFilters: dropdownFilterSpecs = emptyArr,
  }: GridFilteringConfig<T, GF, F, DF>,
): [Array<ParsedGridRow<T>>, GridFilteringProps<GF, F, DF>] {
  const initialFilteringState = useMemo<FilteringState<GF, F, DF>>(() => {
    return {
      globalValuesByKey: globalFilterSpecs.reduce((acc, { key, initialValue }) => {
        acc[key] = initialValue
        return acc
      }, {} as GF),
      valuesByKey: filterSpecs.reduce((acc, { columnKey, initialValue }) => {
        acc[columnKey as keyof F] = initialValue
        return acc
      }, {} as F),
      dropdownValuesByKey: dropdownFilterSpecs.reduce((acc, { key, initialValue }) => {
        acc[key] = initialValue
        return acc
      }, {} as DF),
    }
  }, [])
  const [{ globalValuesByKey, valuesByKey, dropdownValuesByKey }, dispatch] = useReducer<
    FilteringReducer<T, GF, F, DF>
  >(filteringReducer, initialFilteringState)

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

  const dropdownFilterHandlers = useMemo<Record<keyof DF, FilterValueChangeHandler>>(
    () =>
      dropdownFilterSpecs.reduce((acc, { key, onChange }) => {
        if (onChange) {
          acc[key] = onChange
        }
        return acc
      }, {} as Record<keyof DF, FilterValueChangeHandler>),
    [dropdownFilterSpecs],
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
  const getDropdownFilterUpdater = useCallback(
    memoize((key) => (value) => {
      dispatch({ type: 'update', payload: { key, dropdownFilter: true, value } })
      if (dropdownFilterHandlers[key]) {
        return dropdownFilterHandlers[key](value)
      }
    }),
    [dropdownFilterHandlers],
  )
  const getDropdownFilterClearFn = useCallback(
    memoize((key) => () => {
      dispatch({ type: 'clear', payload: { key, dropdownFilter: true } })
      if (dropdownFilterHandlers[key]) {
        return dropdownFilterHandlers[key](null)
      }
    }),
    [dropdownFilterHandlers],
  )
  const clearFilters = useCallback(async () => {
    dispatch({ type: 'clearAll' })
    if (onClearFilters) {
      return onClearFilters()
    }
  }, [onClearFilters])

  const dropdownFilteredRows = useMemo<Array<ParsedGridRow<T>>>(() => {
    return dropdownFilterSpecs.reduce(
      (rows, { key, controlled, equalityComparerFn = equals, allowEmpty = false }) => {
        if (
          dropdownValuesByKey[key] !== undefined &&
          (allowEmpty || !isNilOrEmpty(dropdownValuesByKey[key]))
        ) {
          if (controlled || dropdownValuesByKey[key] === allKey) {
            return rows
          }
          return rows.filter((row) => equalityComparerFn(row.item, dropdownValuesByKey[key]))
        }
        return rows
      },
      rows,
    )
  }, [dropdownFilterSpecs, rows, dropdownValuesByKey])

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
      dropdownFilteredRows,
    )
  }, [globalFilterSpecs, dropdownFilteredRows, globalValuesByKey])

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

  // const dropdownFilters = useMemo(() => {
  const dropdownFilters = useMemo<GridFilterProps<DF>[]>(() => {
    return dropdownFilterSpecs.map(
      ({
        key,
        label,
        FilterComponent,
        filterComponentProps,
        getOptionsFn,
        filterComponentOptionsPropName,
      }) => {
        const items = filteredRows.map((row) => row.item)
        const dropdownOptions = getOptionsFn(items)
        return {
          key,
          label,
          updateFilterValue: getDropdownFilterUpdater(key),
          filterValue: dropdownValuesByKey[key],
          clearFilter: getDropdownFilterClearFn(key),
          filterValues: dropdownValuesByKey,
          FilterComponent,
          filterComponentProps: {
            ...filterComponentProps,
            [filterComponentOptionsPropName]: dropdownOptions,
          },
        }
      },
    )
  }, [dropdownValuesByKey, filteredRows])

  const dropdownFilterValues = useMemo(() => {
    const filterInfo = dropdownFilters.map((filter) => {
      return { key: filter.key, updateFilterValue: filter.updateFilterValue, label: filter?.label }
    })
    const activeFilters = filterInfo.reduce((accum, current) => {
      const keyValues = dropdownValuesByKey[current?.key] || []
      // @ts-ignore not sure how to resolve this ts error
      const transformedValues = keyValues.map((value) => {
        return {
          key: current.key,
          label: current.label,
          updateFilterValue: current.updateFilterValue,
          value: value,
          display: typeof value === 'object' ? `${value.key}=${value.value}` : value,
        }
      })
      return [...accum, ...transformedValues]
    }, [])
    return activeFilters
  }, [dropdownValuesByKey, dropdownFilters])

  return [
    filteredRows,
    {
      globalFilters,
      filters,
      dropdownFilters,
      dropdownFilterValues,
      dropdownValuesByKey,
      clearFilters,
    },
  ]
}
