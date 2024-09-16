import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { FC, PropsWithChildren, ReactNode, useContext, useMemo } from 'react'
import Progress from '../../components/progress/Progress'
import Theme, { TypographyModel } from '../../theme-manager/themes/model'
import GridEmptyContent from './GridEmptyContent'
import GridHeader from './GridHeader'
import GridPagination from './GridPagination'
import GridRow from './GridRow'
import GridToolbar from './GridToolbar'
import useGridExpandedRows, { GridExpandedRowsConfig } from './hooks/useGridExpandedRows'
import useGridFiltering, { GridFilteringConfig } from './hooks/useGridFiltering'
import useGridManagedColumns, {
  GridManagedColumnSpec,
  GridManagedColumnsConfig,
} from './hooks/useGridManagedColumns'
import useGridPagination, { GridPaginationConfig } from './hooks/useGridPagination'
import useGridRowMenu, { GridRowMenuConfig } from './hooks/useGridRowMenu'
import useGridRows, { Accessor, GridBaseConfig, GridColumnSpec } from './hooks/useGridRows'
import useGridSelectableRows, { GridBatchActionsConfig } from './hooks/useGridSelectableRows'
import useGridSorting, { GridSortableColumnSpec, GridSortingConfig } from './hooks/useGridSorting'

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
  hidePagination?: boolean
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
    GridExpandedRowsConfig<T>,
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
  trTopExpanded: {
    border: `2px solid ${theme.components.table.toolbarColor}`,
    borderBottom: '0px',
  },
  trBotExpanded: {
    border: `2px solid ${theme.components.table.toolbarColor}`,
    borderTop: '0px',
  },
  // Fast transition combined with high max height to minimize risk for expandable
  // row size while showing minimal difference in open vs close animations
  expandingContainer: {
    transition: ' max-height 0.3s ease',
    maxHeight: '0px',
    overflow: 'hidden',
  },
  expandedContainer: {
    maxHeight: '1000px',
  },
  td: {
    border: 0,
    margin: 0,
    padding: theme.spacing(1),
    verticalAlign: 'middle',
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
    '& > .tooltip-container > .checkbox': {
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
    hidePagination = false,
    expandableRow,
  } = configProps

  const rows = useGridRows(configProps)
  const [rowsWithActions, rowActionsProps] = useGridRowMenu(rows, configProps)
  const [selectableRows, rowBatchActionsProps] = useGridSelectableRows(rowsWithActions, configProps)
  const [filteredRows, filteringProps] = useGridFiltering(selectableRows, configProps)
  const [sortedRows, sortingProps] = useGridSorting(filteredRows, configProps)
  const [pageRows, paginationProps] = useGridPagination(sortedRows, configProps)
  const [colManagedRows, columnProps] = useGridManagedColumns(pageRows, configProps)
  const [_, expandedRowProps] = useGridExpandedRows(colManagedRows, configProps)

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
                  rowMenuCellWidth={
                    rowActionsProps.rowMenuItems?.length > 1 ||
                    rowActionsProps.showRowMenuForSingleRowActions
                      ? 20
                      : 120
                  }
                  pageRows={pageRows}
                />
                <tbody>
                  {colManagedRows.map(({ key, ...rowProps }, index) => {
                    const isExpanded = expandedRowProps?.expandedRowsById?.[key]
                    return (
                      <React.Fragment key={key}>
                        <GridRow
                          key={key}
                          className={clsx(classes.tr, {
                            [classes.trTopExpanded]: isExpanded,
                          })}
                          tdClassName={classes.td}
                          cellClassName={classes.cell}
                          index={index}
                          numPageItems={paginationProps?.currentPageItemsCount}
                          rowId={key}
                          {...rowProps}
                          {...rowActionsProps}
                          {...rowBatchActionsProps}
                          {...expandedRowProps}
                        />
                        {expandableRow && isExpanded && (
                          <tr
                            className={clsx({
                              [classes.trBotExpanded]: isExpanded,
                            })}
                          >
                            {/* This would not be viable if we have more than 100 rows */}
                            <td colSpan={100}>
                              <div
                                className={clsx(classes.expandingContainer, {
                                  [classes.expandedContainer]: isExpanded,
                                })}
                              >
                                {expandableRow(rowProps?.item, expandedRowProps?.onRowExpand(key))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <GridEmptyContent>{loading ? '' : emptyContent}</GridEmptyContent>
            )}
          </section>
          {sortedRows.length &&
          !hidePagination &&
          (!compact || sortedRows.length > paginationProps.rowsPerPage) ? (
            <GridPagination {...paginationProps} />
          ) : null}
        </div>
      </GridContext.Provider>
    </Progress>
  )
}
