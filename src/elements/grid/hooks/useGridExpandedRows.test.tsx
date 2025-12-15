import React, { useEffect } from 'react'
import { act, render, screen, waitFor } from '../../../test-utils'
import useGridExpandedRows from './useGridExpandedRows'
import type { ParsedGridRow } from './useGridRows'

type Item = { id: string }

function makeRows(
  ids: string[],
  opts?: {
    selected?: Record<string, boolean>
  },
): Array<ParsedGridRow<Item>> {
  return ids.map((id) => ({
    key: id,
    item: { id },
    getCells: () => [],
    isSelected: opts?.selected?.[id] ?? false,
  }))
}

type TestHarnessProps = {
  rows: Array<ParsedGridRow<Item>>
  allowMultipleExpandedRows?: boolean
  expandRowsUponSelection?: boolean
  expandedByDefault?: (row: Item) => boolean
  onState?: (state: any) => void
}

const TestHarness: React.FC<TestHarnessProps> = ({
  rows,
  allowMultipleExpandedRows,
  expandRowsUponSelection,
  expandedByDefault,
  onState,
}) => {
  const [, props] = useGridExpandedRows(rows, {
    expandableRow: () => <div />,
    expandedByDefault,
    allowMultipleExpandedRows,
    expandRowsUponSelection,
  })

  useEffect(() => {
    onState?.(props)
  })

  return (
    <div>
      <div data-testid="expanded">{JSON.stringify(props.expandedRowsById || {})}</div>
      <button onClick={props.onRowExpand?.('a')}>toggle-a</button>
      <button onClick={props.onRowExpand?.('b')}>toggle-b</button>
    </div>
  )
}

describe('useGridExpandedRows', () => {
  it('returns empty expanded map when expandableRow is not provided', () => {
    const rows = makeRows(['a'])

    const NoExpandable: React.FC = () => {
      const [, props] = useGridExpandedRows(rows, {})
      return <div data-testid="expanded">{JSON.stringify(props.expandedRowsById)}</div>
    }

    render(<NoExpandable />)
    expect(screen.getByTestId('expanded').textContent).toBe('{}')
  })

  it('initializes expanded rows using expandedByDefault', () => {
    const rows = makeRows(['a', 'b'])
    render(
      <TestHarness
        rows={rows}
        expandedByDefault={(row) => row.id === 'a'}
      />,
    )

    expect(screen.getByTestId('expanded').textContent).toBe('{"a":true,"b":false}')
  })

  it('toggles a single expanded row and collapses any previously expanded row when allowMultipleExpandedRows=false', () => {
    const rows = makeRows(['a', 'b'])
    render(<TestHarness rows={rows} />)

    act(() => {
      screen.getByText('toggle-a').click()
    })
    expect(screen.getByTestId('expanded').textContent).toBe('{"a":true,"b":false}')

    act(() => {
      screen.getByText('toggle-b').click()
    })
    expect(screen.getByTestId('expanded').textContent).toBe('{"a":false,"b":true}')
  })

  it('allows multiple expanded rows when allowMultipleExpandedRows=true', () => {
    const rows = makeRows(['a', 'b'])
    render(<TestHarness rows={rows} allowMultipleExpandedRows />)

    act(() => {
      screen.getByText('toggle-a').click()
    })

    expect(screen.getByTestId('expanded').textContent).toBe('{"a":true,"b":false}')

    act(() => {
      screen.getByText('toggle-b').click()
    })

    expect(screen.getByTestId('expanded').textContent).toBe('{"a":true,"b":true}')
  })

  it('expands selected rows when expandRowsUponSelection=true', () => {
    const rows = makeRows(['a', 'b', 'c'], { selected: { b: true, c: true } })

    render(<TestHarness rows={rows} expandRowsUponSelection />)

    // effect runs after render
    return waitFor(() => {
      expect(screen.getByTestId('expanded').textContent).toBe('{"b":true,"c":true}')
    })
  })
})
