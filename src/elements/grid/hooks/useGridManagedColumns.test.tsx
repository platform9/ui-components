import React from 'react'
import { act, render, screen } from '../../../test-utils'
import useGridManagedColumns from './useGridManagedColumns'
import type { GridManagedColumnSpec } from './useGridManagedColumns'
import type { ParsedGridRow } from './useGridRows'

type Item = { id: string; a: string; b: string }

function makeRows(ids: string[]): Array<ParsedGridRow<Item>> {
  return ids.map((id) => ({
    key: id,
    item: { id, a: `a-${id}`, b: `b-${id}` },
    getCells: () => [
      { key: 'a', value: `a-${id}`, width: 'small', getFormattedValue: () => `a-${id}`, CellComponent: () => null },
      { key: 'b', value: `b-${id}`, width: 'small', getFormattedValue: () => `b-${id}`, CellComponent: () => null },
    ],
  }))
}

const columns: Array<GridManagedColumnSpec<Item>> = [
  { key: 'a', label: 'A', width: 'small', display: true },
  { key: 'b', label: 'B', width: 'small', display: true },
]

const Harness: React.FC<{ config?: any }> = ({ config }) => {
  const [rows, props] = useGridManagedColumns(makeRows(['1']), { columns, ...(config || {}) })

  return (
    <div>
      <div data-testid="ordered">{props.columns.map((c) => c.key).join(',')}</div>
      <div data-testid="visible">{props.columns.filter((c) => c.visible).map((c) => c.key).join(',')}</div>
      <div data-testid="togglers">{props.columnTogglers.map((t) => `${t.key}:${t.visible}`).join(',')}</div>
      <div data-testid="row-cells">{rows[0].getCells().map((c) => (c ? c.key : 'null')).join(',')}</div>
      <button onClick={() => props.columnTogglers[0].toggleColumn?.()}>toggle-first</button>
      <button onClick={() => props.columns[0].changeColumnOrder?.(1)}>move-first-to-1</button>
    </div>
  )
}

describe('useGridManagedColumns', () => {
  it('respects columnsOrder and visibleColumns initial config', () => {
    render(<Harness config={{ columnsOrder: ['b', 'a'], visibleColumns: ['b'] }} />)

    expect(screen.getByTestId('ordered').textContent).toBe('b')
    // Only visible columns are included in props.columns
    expect(screen.getByTestId('visible').textContent).toBe('b')
    // Row cells are aligned to visible ordered columns
    expect(screen.getByTestId('row-cells').textContent).toBe('b')
  })

  it('toggleColumn hides a visible column when column canHide', () => {
    render(<Harness />)

    expect(screen.getByTestId('visible').textContent).toBe('a,b')

    act(() => {
      screen.getByText('toggle-first').click()
    })

    // after hiding 'a', only 'b' remains visible
    expect(screen.getByTestId('visible').textContent).toBe('b')
  })

  it('changeColumnOrder reorders columns', () => {
    render(<Harness />)

    act(() => {
      screen.getByText('move-first-to-1').click()
    })

    expect(screen.getByTestId('ordered').textContent).toBe('b,a')
  })
})
