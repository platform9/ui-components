/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { ParsedGridRow } from './useGridRows'

/*
  Rows can only be expanded by
  1. Clicking on an expand button in the row
  OR
  2. Selecting a row via the checkbox or radio button

  The default behavior is to expand row via a button in the row, preferably in the very last column.
  You can add this button by passing a button to the very last column of the row via the column definitions.

  However, if `expandRowsUponSelection` is set to true, rows will be expanded when selected
  via the checkbox or radio button. 

  Example of expanding row when selected via checkbox or radio button:
   <Grid
          label="Label"
          uniqueIdentifier="id"
          columns={columns}
          data={items}          
          disableRowSelection={false}
          selectedItems={selectedItems}
          onSelectChange={(selectedItems) => setSelectedItems(selectedItems)}
          expandableRow={(item, onExpandRow) => {
            return <span style={{ padding: '16px' }}>Expanded Row</span>
          }}
          expandRowsUponSelection
   />
*/

export interface GridExpandedRowsConfig<T> {
  expandableRow?: (row: T, onRowExpand) => ReactNode
  expandedByDefault?: (row: T) => boolean
  allowMultipleExpandedRows?: boolean
  expandRowsUponSelection?: boolean
}

export interface GridExpandedRowsProps {
  expandedRowsById?: {
    [key: string]: boolean
  }
  onRowExpand?: (key) => () => void
}

export default function useGridExpandedRows<T>(
  rows: Array<ParsedGridRow<T>>,
  {
    expandableRow,
    expandedByDefault,
    allowMultipleExpandedRows = false,
    expandRowsUponSelection = false,
  }: GridExpandedRowsConfig<T>,
): [Array<ParsedGridRow<T>>, GridExpandedRowsProps] {
  if (!expandableRow) {
    return [rows, { expandedRowsById: {} }]
  }

  const initialExpandedRows = useMemo(() => {
    return expandableRow
      ? rows?.reduce((accum, row) => {
          return {
            ...accum,
            [row.key]: expandedByDefault ? expandedByDefault(row.item) : false,
          }
        }, {})
      : rows
  }, [rows])
  const [expandedRowsById, setExpandedRowsById] = useState(initialExpandedRows)

  const onRowExpand = (key) => () => {
    if (allowMultipleExpandedRows) {
      setExpandedRowsById({
        ...expandedRowsById,
        [key]: !expandedRowsById[key],
      })
    } else {
      // Only one row should be expanded at one time. Check to see if any row is currently expanded
      const currentExpandedRowKey = Object.entries(expandedRowsById).find(
        ([key, expanded]) => expanded === true,
      )?.[0]

      setExpandedRowsById({
        ...expandedRowsById,
        // if a row is already expanded, close it
        ...(currentExpandedRowKey ? { [currentExpandedRowKey]: false } : {}),
        [key]: !expandedRowsById[key],
      })
    }
  }

  useEffect(() => {
    if (!expandRowsUponSelection) return
    const rowsToExpand = rows.reduce((accum, row) => {
      if (!row.isSelected) return accum
      accum[row.key] = true
      return accum
    }, {})
    setExpandedRowsById(rowsToExpand)
  }, [expandRowsUponSelection, rows])

  return [
    rows,
    {
      expandedRowsById,
      onRowExpand,
    },
  ]
}
