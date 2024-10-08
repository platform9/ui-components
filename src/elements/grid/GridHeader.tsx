import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import Text from '../../elements/Text'
import Checkbox from '../../elements/input/Checkbox'
import Theme from '../../theme-manager/themes/model'
import { topMiddle } from '../menu/defaults'
import Tooltip from '../tooltip'
import GridTableHeading from './GridTableHeading'
import { GridManagedColumnsProps } from './hooks/useGridManagedColumns'
import { GridBatchActionsProps, SelectableParsedGridRow } from './hooks/useGridSelectableRows'
import { GridSortingProps } from './hooks/useGridSorting'

export interface GridHeaderProps<T>
  extends GridSortingProps,
    GridBatchActionsProps<T>,
    GridManagedColumnsProps {
  pageRows: Array<SelectableParsedGridRow<T>>
  rowMenuItemsLength: number
  rowMenuCellWidth?: number
}

interface SelectAllColumnProps<T> {
  className: string
  pageRows: Array<SelectableParsedGridRow<T>>
  rowsSelectionDisabled: boolean
  multiSelectionEnabled: boolean
  toggleSelectAll: (rows: Array<SelectableParsedGridRow<T>>) => void
  selectionStatus: 'all' | 'some' | 'none'
}

const useStyles = makeStyles<Theme, GridSortingProps>((theme) => ({
  gridHead: {
    border: 'none',
  },
  gridHeadTr: {
    textAlign: 'left',
    '& th': {
      verticalAlign: 'middle',
    },
  },
  gridHeadTitleTr: {
    backgroundColor: theme.components.table.hoverBackground,
    height: 36,
    border: 'none',
    borderTop: `1px solid ${theme.components.table.border}`,
    borderBottom: `1px solid ${theme.components.table.border}`,
  },
  gridSelectAllTh: {
    width: 40,
    paddingLeft: 10,
  },
  nowrap: {
    whiteSpace: 'nowrap',
  },
  tooltipContainer: {
    display: 'inline-block',
  },
  tooltip: {
    marginLeft: 8,
  },
}))

function SelectAllColumn<T>({
  className,
  pageRows,
  rowsSelectionDisabled,
  multiSelectionEnabled,
  toggleSelectAll,
  selectionStatus,
}: SelectAllColumnProps<T>) {
  if (rowsSelectionDisabled) {
    return null
  }
  const checked = pageRows.every(({ isSelected }) => isSelected)
  const indeterminate = !checked && selectionStatus === 'some'
  return (
    <th className={clsx(className, 'select-column')}>
      {multiSelectionEnabled ? (
        <Checkbox
          checked={checked || indeterminate}
          indeterminate={indeterminate}
          onChange={() => toggleSelectAll(pageRows)}
        />
      ) : null}
    </th>
  )
}

export default function GridHeader<T>(props: GridHeaderProps<T>) {
  const {
    columns,
    sortingDisabled,
    sortedBy,
    sortedDirection,
    toggleSort,
    multiSelectionEnabled,
    toggleSelectAll,
    selectionStatus,
    rowsSelectionDisabled,
    pageRows,
    rowMenuItemsLength,
    rowMenuCellWidth = 20,
  } = props
  const classes = useStyles(props)
  return (
    <thead className={classes.gridHead}>
      <Text
        component="tr"
        variant="caption2"
        className={clsx(classes.gridHeadTr, classes.gridHeadTitleTr)}
      >
        <SelectAllColumn
          className={classes.gridSelectAllTh}
          {...{
            pageRows,
            rowsSelectionDisabled,
            multiSelectionEnabled,
            toggleSelectAll,
            selectionStatus,
          }}
        />
        {columns
          .filter(({ visible }) => visible !== false)
          .map(({ key, width, tooltip, label }) => (
            <GridTableHeading
              width={width}
              sortingDisabled={sortingDisabled}
              onClick={sortingDisabled ? null : () => toggleSort(key)}
              key={key}
            >
              <Text variant="caption2" className={clsx('grid_header-text', classes.nowrap)}>
                {label}
                {tooltip && (
                  <Tooltip
                    className={classes.tooltipContainer}
                    align={topMiddle.align}
                    offset={topMiddle.offset}
                    message={tooltip}
                  >
                    <FontAwesomeIcon className={classes.tooltip}>question-circle</FontAwesomeIcon>
                  </Tooltip>
                )}
              </Text>
              {sortedBy === key ? (
                <FontAwesomeIcon aria-hidden="true" solid className="grid_header-direction">
                  {`sort-${sortedDirection === 'asc' ? 'up' : 'down'}`}
                </FontAwesomeIcon>
              ) : null}
            </GridTableHeading>
          ))}
        {rowMenuItemsLength ? (
          <GridTableHeading width={rowMenuCellWidth} sortingDisabled key="row-menu" />
        ) : null}
      </Text>
    </thead>
  )
}
