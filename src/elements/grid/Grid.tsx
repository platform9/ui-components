import React, { ReactNode, useMemo, useContext, FC, PropsWithChildren } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme, { TypographyModel } from '../../theme-manager/themes/model'
import useGridRows, { GridBaseConfig, GridColumnSpec, Accessor } from './hooks/useGridRows'
import useGridRowMenu, { GridRowMenuConfig } from './hooks/useGridRowMenu'
import GridEmptyContent from './GridEmptyContent'
import GridRow from './GridRow'
import GridPagination from './GridPagination'
import useGridPagination, { GridPaginationConfig } from './hooks/useGridPagination'
import useGridSorting, { GridSortingConfig, GridSortableColumnSpec } from './hooks/useGridSorting'
import GridHeader from './GridHeader'
import useGridFiltering, { GridFilteringConfig } from './hooks/useGridFiltering'
import GridToolbar from './GridToolbar'
import Progress from '../../components/progress/Progress'
import useGridSelectableRows, { GridBatchActionsConfig } from './hooks/useGridSelectableRows'
import useGridManagedColumns, {
  GridManagedColumnSpec,
  GridManagedColumnsConfig,
} from './hooks/useGridManagedColumns'

interface GridViewConfig {
  label?: string
  emptyContent?: ReactNode
  extraToolbarContent?: ReactNode
  loading?: boolean
  loadingMessage?: string
  compact?: boolean
  onRefresh?: (...args: unknown[]) => void | Promise<void>
  disableToolbar?: boolean
  ToolbarContainer?: FC<PropsWithChildren<{ className?: string; selectedCount?: number }>>
  showItemsCountInLabel?: boolean
  tooltip?: ReactNode
}

export type GridViewColumn<T, A extends Accessor<T> = Accessor<T>> = GridColumnSpec<T, A> &
  GridSortableColumnSpec &
  GridManagedColumnSpec<T>

export interface GridProps<
  T,
  GF extends Record<string, unknown> = Record<string, unknown>,
  F extends Record<string, unknown> = Record<string, unknown>,
  C extends GridViewColumn<T> = GridViewColumn<T>,
> extends GridViewConfig,
    GridBaseConfig<T, C>,
    GridSortingConfig<C>,
    GridFilteringConfig<T, GF, F>,
    GridPaginationConfig,
    GridRowMenuConfig<T>,
    GridBatchActionsConfig<T>,
    GridManagedColumnsConfig<T, C> {}

const useStyles = makeStyles<Theme, GridViewConfig>((theme: Theme) => ({
  noTableBorder: {
    borderColor: 'transparent !important',
    borderWidth: '0 !important',
  },
  gridContainer: {
    display: 'grid',
    minWidth: '100%',
    maxWidth: 'max-content',
    backgroundColor: theme.components.table.background,
    borderRadius: 4,
    border: `1px solid ${theme.components.table.border}`,
    boxSizing: 'border-box',
  },
  grid: {
    minWidth: '100%',
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    fontWeight: 400,
    lineHeight: 1.42857,
    textRendering: 'optimizeLegibility',
    border: 'none',
    borderBottom: `1px solid ${theme.components.table.border}`,
  },
  gridBody: {
    overflow: 'auto',
  },
  tr: {
    position: 'relative',
    border: 0,
    height: 56,
    transition: 'background-color 150ms ease',
    borderBottom: `1px solid ${theme.components.table.border}`,
    '&:last-child td': {
      borderBottom: 0,
    },
    '&:hover': {
      backgroundColor: theme.components.table.hoverBackground,
    },
  },
  td: {
    border: 0,
    margin: 0,
    padding: theme.spacing(1),
    ...(theme.typography.body2 as TypographyModel),

    '&:first-child': {
      borderLeft: 'none',
      paddingLeft: 16,
    },
    '&:last-child': {
      borderRight: 'none',
      paddingRight: 16,
    },
    '& > .checkbox': {
      padding: 4,
      marginLeft: -4,
      width: 16,
    },
  },
  cell: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

export type GridContextType<T> = {
  triggerRefresh?: () => void
  selectedItems?: T[]
  clearSelectedRows?: () => void
}

export const GridContext = React.createContext({})

/**
 * Convenience shortcut for `useContext<GridContextType<T>>(GridContext)`
 */
export function useGridContext<T>() {
  return useContext<GridContextType<T>>(GridContext)
}

export default function Grid<
  T,
  GF extends Record<string, unknown> = Record<string, unknown>,
  F extends Record<string, unknown> = Record<string, unknown>,
>(configProps: GridProps<T, GF, F>) {
  const classes = useStyles(configProps)
  const {
    onRefresh,
    emptyContent = 'No data found',
    disableToolbar = false,
    extraToolbarContent,
    loading = false,
    loadingMessage,
    compact,
    label,
    ToolbarContainer,
    showItemsCountInLabel,
    tooltip,
  } = configProps

  const rows = useGridRows(configProps)
  const [rowsWithActions, rowActionsProps] = useGridRowMenu(rows, configProps)
  const [selectableRows, rowBatchActionsProps] = useGridSelectableRows(rowsWithActions, configProps)
  const [filteredRows, filteringProps] = useGridFiltering(selectableRows, configProps)
  const [sortedRows, sortingProps] = useGridSorting(filteredRows, configProps)
  const [pageRows, paginationProps] = useGridPagination(sortedRows, configProps)
  const [colManagedRows, columnProps] = useGridManagedColumns(pageRows, configProps)

  const contextValue = useMemo<GridContextType<T>>(
    () => ({
      triggerRefresh: onRefresh,
      selectedItems: rowBatchActionsProps.selectedItems,
      clearSelectedRows: rowBatchActionsProps.clearSelectedRows,
    }),
    [onRefresh, rowBatchActionsProps.selectedItems, rowBatchActionsProps.clearSelectedRows],
  )

  return (
    <Progress overlay loading={loading} message={loadingMessage}>
      <GridContext.Provider value={contextValue}>
        <div
          className={clsx(classes.gridContainer, 'grid-container', {
            [classes.noTableBorder]:
              (!colManagedRows.length && compact) || (compact && disableToolbar),
          })}
        >
          {disableToolbar ? null : (
            <GridToolbar
              ToolbarContainer={ToolbarContainer}
              compact={compact}
              label={label}
              showItemsCountInLabel={showItemsCountInLabel}
              itemsCount={paginationProps?.itemsCount}
              onRefresh={onRefresh}
              extraToolbarContent={extraToolbarContent}
              tooltip={tooltip}
              {...columnProps}
              {...filteringProps}
              {...rowBatchActionsProps}
            />
          )}
          <section className={clsx(classes.gridBody, 'thin-scrollbar')}>
            {colManagedRows.length ? (
              <table className={classes.grid}>
                <GridHeader
                  {...columnProps}
                  {...sortingProps}
                  {...rowBatchActionsProps}
                  rowMenuItemsLength={rowActionsProps.rowMenuItems?.length}
                  pageRows={pageRows}
                />
                <tbody>
                  {colManagedRows.map(({ key, ...rowProps }, index) => (
                    <GridRow
                      key={key}
                      className={classes.tr}
                      tdClassName={classes.td}
                      cellClassName={classes.cell}
                      index={index}
                      numPageItems={paginationProps?.currentPageItemsCount}
                      {...rowProps}
                      {...rowActionsProps}
                      {...rowBatchActionsProps}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <GridEmptyContent>{loading ? '' : emptyContent}</GridEmptyContent>
            )}
          </section>
          {sortedRows.length && (!compact || sortedRows.length > paginationProps.rowsPerPage) ? (
            <GridPagination {...paginationProps} />
          ) : null}
        </div>
      </GridContext.Provider>
    </Progress>
  )
}
