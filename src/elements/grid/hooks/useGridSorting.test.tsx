import React from 'react'
import { act, render, screen } from '../../../test-utils'
import useGridSorting from './useGridSorting'
import type { ParsedGridRow } from './useGridRows'

type Item = { id: string; val: number }

function makeRows(items: Item[]): Array<ParsedGridRow<Item>> {
  return items.map((item) => ({
    key: item.id,
    item,
    getCells: () => [],
  }))
}

const Harness: React.FC = () => {
  const rows = makeRows([
    { id: 'a', val: 2 },
    { id: 'b', val: 1 },
  ])

  const [sortedRows, props] = useGridSorting(rows, {
    columns: [{ key: 'val' }],
  })

  return (
    <div>
      <div data-testid="rows">{sortedRows.map((r) => r.key).join(',')}</div>
      <button onClick={() => props.toggleSort?.('val')}>toggle</button>
    </div>
  )
}

describe('useGridSorting', () => {
  it('toggleSort sorts ascending then descending', () => {
    render(<Harness />)

    // no sorting by default
    expect(screen.getByTestId('rows').textContent).toBe('a,b')

    act(() => {
      screen.getByText('toggle').click()
    })
    // asc by val => b(1), a(2)
    expect(screen.getByTestId('rows').textContent).toBe('b,a')

    act(() => {
      screen.getByText('toggle').click()
    })
    // desc => a(2), b(1)
    expect(screen.getByTestId('rows').textContent).toBe('a,b')
  })
})
