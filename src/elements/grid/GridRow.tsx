import React from 'react'
import Checkbox from 'src/elements/input/Checkbox'
import Radio from 'src/elements/input/Radio'
import { noop } from 'src/utils/fp'
import { memoizeShallow } from 'src/utils/misc'
import generateTestId from 'src/utils/test-helpers'
import { SelectableParsedGridRow } from './hooks/useGridSelectableRows'
import { GridRowMenuItemsProps, GridRowMenuOffset } from './hooks/useGridRowMenu'
import GridRowMenu from './GridRowMenu'

interface SelectRowColumnProps {
  className: string
  multiSelection: boolean
  isSelectable: boolean
  isSelected: boolean
}

const SelectRowColumn = memoizeShallow(
  function SelectRowColumn({
    className,
    multiSelection,
    isSelectable,
    isSelected,
  }: SelectRowColumnProps) {
    if (isSelectable === undefined) {
      return null
    }
    const Toggler = multiSelection ? Checkbox : Radio
    return (
      <td data-testid={generateTestId('cluster', 'checkbox', 'selection')} className={className}>
        <Toggler disabled={!isSelectable} checked={isSelected} onChange={noop} />
      </td>
    )
  },
  {
    maxSize: 8,
  },
)

export interface GridRowProps<T> extends SelectableParsedGridRow<T>, GridRowMenuItemsProps<T> {
  className: string
  tdClassName: string
  cellClassName: string
  index?: number
  numPageItems?: number
  rowMenuOffset?: GridRowMenuOffset
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
  } = props
  return (
    <tr className={className} onClick={toggleSelect}>
      <SelectRowColumn
        className={tdClassName}
        {...{
          multiSelection,
          isSelectable,
          isSelected,
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
          />
        </td>
      ) : null}
    </tr>
  )
}
