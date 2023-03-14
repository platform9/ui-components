import React, { ReactNode } from 'react'
import Grid from 'src/elements/grid/Grid'
import { GridSortingConfig, GridSortableColumnSpec } from 'src/elements/grid/hooks/useGridSorting'
import { GridBaseConfig, Accessor, GridColumnSpec } from 'src/elements/grid/hooks/useGridRows'
import { GridPaginationConfig } from 'src/elements/grid/hooks/useGridPagination'

type ControlledGridColumn<T, A extends Accessor<T> = Accessor<T>> = GridColumnSpec<T, A> &
  GridSortableColumnSpec

export interface ControlledGridProps<T, C extends ControlledGridColumn<T> = ControlledGridColumn<T>>
  extends GridBaseConfig<T, C>,
    GridSortingConfig<C>,
    GridPaginationConfig {
  selectedItems: T[]
  onSelectChange: (selectedItems: T[]) => void
  multiSelection?: boolean
  disableRowSelection?: boolean
  rowIsSelectableFn?: (item: T) => boolean
  loading?: boolean
  loadingMessage?: string
  emptyContent?: ReactNode
}

export default function ControlledGrid<T>(props: ControlledGridProps<T>) {
  return (
    <Grid<T>
      {...props}
      compact
      isControlled
      disableToolbar
      disableColumnOrdering
      disableColumnHiding
    />
  )
}
