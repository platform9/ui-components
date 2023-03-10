import React, { useMemo } from 'react'
import { GridCellProps } from 'src/elements/grid/hooks/useGridRows'
import Badge, { BadgeVariant } from 'src/elements/badge/Badge'

export interface StatusCellModel {
  variant: BadgeVariant
  label?: string
  tooltipBody?: string
}

interface BaseGridStatusCellProps<V> {
  dataFn: (value: V) => StatusCellModel
}

interface GridStatusCellProps<T, V> extends GridCellProps<T, V>, BaseGridStatusCellProps<V> {}

export default function GridStatusCell<T, V = string>({
  value,
  dataFn,
}: GridStatusCellProps<T, V>) {
  const { variant, label = String(value), tooltipBody } = useMemo(() => dataFn(value), [value])
  return <Badge variant={variant} text={label} tooltipBody={tooltipBody} />
}

export function createGridStatusCell<T, V = string>({ dataFn }: BaseGridStatusCellProps<V>) {
  return (props: GridCellProps<T, V>) => {
    return <GridStatusCell<T, V> {...props} dataFn={dataFn} />
  }
}
