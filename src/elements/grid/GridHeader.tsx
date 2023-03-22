import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { GridSortingProps } from './hooks/useGridSorting'
import { GridBatchActionsProps, SelectableParsedGridRow } from './hooks/useGridSelectableRows'
import Theme from '../../theme-manager/themes/model'
import Text from '../../elements/Text'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import Checkbox from '../../elements/input/Checkbox'
import { GridManagedColumnsProps } from './hooks/useGridManagedColumns'
import GridTableHeading from './GridTableHeading'

export interface GridHeaderProps<T>
  extends GridSortingProps,
    GridBatchActionsProps<T>,
    GridManagedColumnsProps {
  pageRows: Array<SelectableParsedGridRow<T>>
  rowMenuItemsLength: number
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
              <Text
                title={String(tooltip || label)}
                variant="caption2"
                className="grid_header-text"
              >
                {label}
              </Text>
              {sortedBy === key ? (
                <FontAwesomeIcon aria-hidden="true" solid className="grid_header-direction">
                  {`sort-${sortedDirection === 'asc' ? 'up' : 'down'}`}
                </FontAwesomeIcon>
              ) : null}
            </GridTableHeading>
          ))}
        {rowMenuItemsLength ? (
          <GridTableHeading
            width={rowMenuItemsLength > 1 ? 20 : 120}
            sortingDisabled
            key="row-menu"
          />
        ) : null}
      </Text>
    </thead>
  )
}
