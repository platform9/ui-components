import React from 'react'
import { act, render, screen } from '../../../test-utils'
import useGridSelectableRows from './useGridSelectableRows'
import type { ParsedGridRow } from './useGridRows'

type Item = { id: string }

function makeRows(ids: string[]): Array<ParsedGridRow<Item>> {
  return ids.map((id) => ({
    key: id,
    item: { id },
    getCells: () => [],
  }))
}

const Harness: React.FC = () => {
  const rows = makeRows(['a', 'b'])
  const [, props] = useGridSelectableRows(rows, {
    multiSelection: true,
    batchActions: [{ label: 'Do' }],
  })

  return (
    <div>
      <div data-testid="status">{props.selectionStatus}</div>
      <div data-testid="count">{String(props.selectedCount)}</div>
      <button onClick={() => props.toggleSelectAll?.()}>toggle-all</button>
      <button onClick={() => props.clearSelectedRows?.()}>clear</button>
    </div>
  )
}

describe('useGridSelectableRows', () => {
  it('supports selecting all and clearing selection', () => {
    render(<Harness />)

    expect(screen.getByTestId('status').textContent).toBe('none')
    expect(screen.getByTestId('count').textContent).toBe('0')

    act(() => {
      screen.getByText('toggle-all').click()
    })

    expect(screen.getByTestId('status').textContent).toBe('all')
    expect(screen.getByTestId('count').textContent).toBe('2')

    act(() => {
      screen.getByText('clear').click()
    })

    expect(screen.getByTestId('status').textContent).toBe('none')
    expect(screen.getByTestId('count').textContent).toBe('0')
  })
})
