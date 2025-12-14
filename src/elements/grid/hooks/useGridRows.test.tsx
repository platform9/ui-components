import React from 'react'
import { render, screen } from '../../../test-utils'
import useGridRows from './useGridRows'
import type { GridColumnSpec, ParsedGridRow } from './useGridRows'

type Item = {
  id: string
  nested?: { value?: string }
}

const Harness: React.FC<{ data: Item[]; columns: Array<GridColumnSpec<Item>> }> = ({ data, columns }) => {
  const rows: Array<ParsedGridRow<Item>> = useGridRows({ uniqueIdentifier: 'id', columns, data })
  return <div data-testid="row-keys">{rows.map((r) => r.key).join(',')}</div>
}

describe('useGridRows', () => {
  it('parses rows with key from uniqueIdentifier', () => {
    render(
      <Harness
        data={[{ id: 'a' }, { id: 'b' }]}
        columns={[{ key: 'id', label: 'ID' }]}
      />,
    )

    expect(screen.getByTestId('row-keys').textContent).toBe('a,b')
  })

  it('supports accessor as dot-path and getFormattedValue uses formatFn', () => {
    const ColumnHarness: React.FC = () => {
      const rows = useGridRows<Item>({
        uniqueIdentifier: 'id',
        data: [{ id: 'a', nested: { value: 'v' } }],
        columns: [
          {
            key: 'nested.value',
            label: 'Nested',
            accessor: 'nested.value',
            formatFn: (value) => String(value).toUpperCase(),
          },
        ],
      })

      const cell = rows[0].getCells()[0]
      return (
        <div>
          <div data-testid="cell-value">{String(cell.value)}</div>
          <div data-testid="cell-formatted">{String(cell.getFormattedValue())}</div>
        </div>
      )
    }

    render(<ColumnHarness />)

    expect(screen.getByTestId('cell-value').textContent).toBe('v')
    expect(screen.getByTestId('cell-formatted').textContent).toBe('V')
  })

  it('supports accessor as function', () => {
    const FnHarness: React.FC = () => {
      const rows = useGridRows<Item>({
        uniqueIdentifier: 'id',
        data: [{ id: 'a' }],
        columns: [
          {
            key: 'computed',
            label: 'Computed',
            accessor: (item) => `x-${item.id}`,
          },
        ],
      })
      const cell = rows[0].getCells()[0]
      return <div data-testid="cell-value">{String(cell.value)}</div>
    }

    render(<FnHarness />)
    expect(screen.getByTestId('cell-value').textContent).toBe('x-a')
  })
})
