import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '../../../test-utils'
import useGridFiltering from './useGridFiltering'
import type { ParsedGridRow } from './useGridRows'

type Item = { id: string; status: string }

type Filters = { status?: string | null }

type Globals = { search?: string | null }

function makeRows(items: Item[]): Array<ParsedGridRow<Item>> {
  return items.map((item) => ({
    key: item.id,
    item,
    getCells: () => [],
  }))
}

const DummyFilter: React.FC<any> = () => null

const Harness: React.FC = () => {
  const rows = makeRows([
    { id: 'a', status: 'ok' },
    { id: 'b', status: 'fail' },
  ])

  const [filteredRows, props] = useGridFiltering<Item, Globals, Filters, Record<string, unknown>>(rows, {
    filters: [
      {
        columnKey: 'status',
        FilterComponent: DummyFilter,
        initialValue: null,
        equalityComparerFn: (itemColValue, filterValue) => itemColValue === filterValue,
      },
    ],
  })

  return (
    <div>
      <div data-testid="rows">{filteredRows.map((r) => r.key).join(',')}</div>
      <button onClick={() => props.filters[0].updateFilterValue('ok')}>filter-ok</button>
    </div>
  )
}

describe('useGridFiltering', () => {
  it('filters rows based on filter spec', async () => {
    render(<Harness />)

    expect(screen.getByTestId('rows').textContent).toBe('a,b')

    await userEvent.click(screen.getByText('filter-ok'))

    await waitFor(() => {
      expect(screen.getByTestId('rows').textContent).toBe('a')
    })
  })

  it('calls filter onChange handler when provided', async () => {
    const rows = makeRows([
      { id: 'a', status: 'ok' },
      { id: 'b', status: 'fail' },
    ])

    const onChange = jest.fn()

    const WithOnChange: React.FC = () => {
      const [filteredRows, props] = useGridFiltering<Item, Globals, Filters, Record<string, unknown>>(rows, {
        filters: [
          {
            columnKey: 'status',
            FilterComponent: DummyFilter,
            initialValue: null,
            onChange,
          },
        ],
      })

      return (
        <div>
          <div data-testid="rows">{filteredRows.map((r) => r.key).join(',')}</div>
          <button onClick={() => props.filters[0].updateFilterValue('ok')}>filter-ok</button>
        </div>
      )
    }

    render(<WithOnChange />)

    await userEvent.click(screen.getByText('filter-ok'))

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('ok')
    })
  })
})
