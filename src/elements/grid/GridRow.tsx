import React from 'react'
import Checkbox from '../../elements/input/Checkbox'
import Radio from '../../elements/input/Radio'
import { noop } from '../../utils/fp'
import { memoizeShallow } from '../../utils/misc'
import generateTestId from '../../utils/test-helpers'
import GridRowMenu from './GridRowMenu'
import { GridExpandedRowsProps } from './hooks/useGridExpandedRows'
import { GridRowMenuItemsProps, GridRowMenuOffset } from './hooks/useGridRowMenu'
import { SelectableParsedGridRow } from './hooks/useGridSelectableRows'

interface SelectRowColumnProps {
  className: string
  multiSelection: boolean
  isSelectable: boolean
  isSelected: boolean
  info?: string | React.ReactNode
}

const SelectRowColumn = memoizeShallow(
  function SelectRowColumn({
    className,
    multiSelection,
    isSelectable,
    isSelected,
    info = undefined,
  }: SelectRowColumnProps) {
    if (isSelectable === undefined) {
      return null
    }
    const Toggler = multiSelection ? Checkbox : Radio
    return (
      <td data-testid={generateTestId('cluster', 'checkbox', 'selection')} className={className}>
        <Toggler disabled={!isSelectable} checked={isSelected} onChange={noop} info={info} />
      </td>
    )
  },
  {
    maxSize: 8,
  },
)

export interface GridRowProps<T>
  extends SelectableParsedGridRow<T>,
    GridRowMenuItemsProps<T>,
    GridExpandedRowsProps {
  className: string
  tdClassName: string
  cellClassName: string
  index?: number
  numPageItems?: number
  rowMenuOffset?: GridRowMenuOffset
  rowId?: string
  disabledRowTooltip?: string | React.ReactNode | ((item: T) => string | React.ReactNode)
}

export default function GridRow<T>(props: GridRowProps<T>) {
  const {
    isSelectable,
    multiSelection,
    isSelected,
    toggleSelect,
    getCells,
    rowMenuItems = [],
    rowMenuDisabled = !rowMenuItems.length,
    item,
    className,
    tdClassName,
    cellClassName,
    index,
    numPageItems,
    rowMenuOffset = {},
    showRowMenuForSingleRowActions,
    maxRowMenuHeight,
    expandedRowsById,
    onRowExpand,
    rowId,
    disabledRowTooltip = undefined,
  } = props
  const disabledTooltipMsg =
    isSelectable === false
      ? typeof disabledRowTooltip === 'function'
        ? disabledRowTooltip(item)
        : disabledRowTooltip
      : undefined
  return (
    <tr className={className} onClick={toggleSelect}>
      <SelectRowColumn
        className={tdClassName}
        {...{
          multiSelection,
          isSelectable,
          isSelected,
          info: isSelectable ? null : disabledTooltipMsg,
        }}
      />
      {getCells().map(({ key, CellComponent, value, getFormattedValue }, idx) => {
        const formattedValue = getFormattedValue()
        return (
          <td data-testid={generateTestId(key)} key={key} className={tdClassName}>
            <CellComponent
              index={idx}
              item={item}
              value={value}
              title={String(formattedValue)}
              className={cellClassName}
              expandRow={onRowExpand ? onRowExpand(rowId) : noop}
              rowIsExpanded={!!expandedRowsById[rowId]}
            >
              {formattedValue}
            </CellComponent>
          </td>
        )
      })}
      {rowMenuItems.length ? (
        <td>
          <GridRowMenu
            item={item}
            rowMenuItems={rowMenuItems}
            rowMenuDisabled={rowMenuDisabled}
            rowMenuOffset={
              index === numPageItems - 1
                ? {
                    vertical: rowMenuOffset.vertical * -1,
                  }
                : rowMenuOffset
            }
            showRowMenuForSingleRowActions={showRowMenuForSingleRowActions}
            maxRowMenuHeight={maxRowMenuHeight}
            expandRow={onRowExpand ? onRowExpand(rowId) : noop}
            toggleRow={toggleSelect}
          />
        </td>
      ) : null}
    </tr>
  )
}
