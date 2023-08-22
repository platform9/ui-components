/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode, useMemo, useState } from 'react'
import { ParsedGridRow } from './useGridRows'

export interface GridExpandedRowsConfig<T> {
  expandableRow?: (row: T, onRowExpand) => ReactNode
  expandedByDefault?: (row: T) => boolean
}

export interface GridExpandedRowsProps {
  expandedRowsById?: {
    [key: string]: boolean
  }
  onRowExpand?: (key) => () => void
}

export default function useGridExpandedRows<T>(
  rows: Array<ParsedGridRow<T>>,
  { expandableRow, expandedByDefault }: GridExpandedRowsConfig<T>,
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

  const onRowExpand = (key) => () =>
    setExpandedRowsById({
      ...expandedRowsById,
      [key]: !expandedRowsById[key],
    })

  return [
    rows,
    {
      expandedRowsById,
      onRowExpand,
    },
  ]
}
