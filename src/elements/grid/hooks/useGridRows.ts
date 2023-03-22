import { FC, useMemo, ReactNode, useCallback } from 'react'
import { memoize, memoizeShallow } from '../../../utils/misc'
import { path } from 'ramda'
import GridDefaultCell from '../cells/GridDefaultCell'

export interface GridBaseConfig<T, C extends GridColumnSpec<T> = GridColumnSpec<T>> {
  uniqueIdentifier: keyof T
  columns: C[]
  data: T[]
  onReload?: () => void | Promise<void>
}

export interface GridCellProps<T, V = unknown> {
  index?: number
  item?: T
  value?: V
  title?: string
  /** This will typically contain the formatted value of the cell */
  children?: ReactNode
  className?: string
}

export type GridCellWidth = 'small' | 'medium' | 'large' | number

export type Accessor<T> = string | keyof T | ((item: T) => unknown)

export interface GridColumnSpec<
  T,
  A extends Accessor<T> = Accessor<T>,
  V = A extends keyof T ? T[A] : A extends (item: T) => unknown ? ReturnType<A> : unknown,
> {
  key: keyof T | string
  label: ReactNode
  tooltip?: ReactNode
  width?: GridCellWidth
  /** If accessor is not defined, key will be used to get the value */
  accessor?: A
  formatFn?: (value: V, item: T) => string
  CellComponent?: FC<GridCellProps<T, V>>

  /** @deprecated less performant than rendering with CellComponent */
  render?: (value: V, item: T) => ReactNode
  memoizeCell?: boolean
}

export interface ParsedGridRow<T> {
  key: string
  item: T
  getCells: () => Array<ParsedGridCell<T>>
}

export interface ParsedGridCell<T, V = unknown> {
  key: string
  value: V
  width: GridCellWidth
  getFormattedValue: () => string
  CellComponent: FC<GridCellProps<T, V>>
}

type ValueFormatter = (format, value, item) => () => string

const maxSize = 100000

function itemValueGetter<
  T,
  A extends Accessor<T> = Accessor<T>,
  V = A extends keyof T ? T[A] : A extends (item: T) => unknown ? ReturnType<A> : unknown,
>(accessor: Accessor<T>, item: T) {
  return typeof accessor === 'function'
    ? accessor(item)
    : path<V>(String(accessor).split('.'), item)
}

const useGridRows = <T>({
  uniqueIdentifier,
  columns,
  data,
}: GridBaseConfig<T>): Array<ParsedGridRow<T>> => {
  const getMoizedCell = useCallback(
    memoize((CellComponent, memoizeCell) =>
      memoizeCell ? memoizeShallow(CellComponent, { maxSize }) : CellComponent,
    ),
    [],
  )
  const getMoizedRenderCell = useCallback(
    memoize((render, memoizeCell) => {
      const CellComponent: FC<GridCellProps<T>> = ({ value, item }) => {
        return render(value, item)
      }
      return memoizeCell ? memoizeShallow(CellComponent, { maxSize }) : CellComponent
    }),
    [],
  )

  const getItemValue = useCallback(memoize(itemValueGetter, { maxSize }), [])
  const getItemValueFormatter = useCallback<ValueFormatter>(
    memoize((formatFn, value, item) => () => formatFn ? formatFn(value, item) : value, {
      maxSize,
    }),
    [],
  )

  const getRow = useCallback(
    memoize(
      (item) => ({
        key: String(item[uniqueIdentifier]),
        item,
        getCells: memoize(() =>
          columns.map(
            ({
              key,
              accessor = key,
              formatFn,
              render,
              width,
              CellComponent = GridDefaultCell,
              memoizeCell = true,
            }) => {
              const value = getItemValue(accessor, item)
              // Don't format the value unless explicitly requested (eg when rendering the rows)
              const getFormattedValue = getItemValueFormatter(formatFn, value, item)
              return {
                key: String(key),
                value,
                width,
                getFormattedValue,
                CellComponent: render
                  ? getMoizedRenderCell(render, memoizeCell)
                  : getMoizedCell(CellComponent, memoizeCell),
              }
            },
          ),
        ),
      }),
      { maxSize },
    ),
    [uniqueIdentifier, columns],
  )

  return useMemo(() => data.map(getRow), [data, getRow])
}

export default useGridRows
