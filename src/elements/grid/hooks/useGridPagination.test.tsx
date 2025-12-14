import React from 'react'
import { act, render, screen } from '../../../test-utils'
import useGridPagination from './useGridPagination'
import type { ParsedGridRow } from './useGridRows'

type Item = { id: string }

function makeRows(ids: string[]): Array<ParsedGridRow<Item>> {
  return ids.map((id) => ({
    key: id,
    item: { id },
    getCells: () => [],
  }))
}

const Harness: React.FC<{ rows: Array<ParsedGridRow<Item>>; config?: any }> = ({ rows, config }) => {
  const [pageRows, props] = useGridPagination(rows, config || {})
  return (
    <div>
      <div data-testid="page-rows">{pageRows.map((r) => r.key).join(',')}</div>
      <div data-testid="current-page">{String(props.currentPage)}</div>
      <div data-testid="pages-count">{String(props.pagesCount)}</div>
      <div data-testid="rows-per-page">{String(props.rowsPerPage)}</div>
      <button onClick={() => props.goToPage?.(2)}>go-2</button>
      <button onClick={() => props.goNextPage?.()}>next</button>
      <button onClick={() => props.goPrevPage?.()}>prev</button>
      <button onClick={() => props.updateRowsPerPage?.(1)}>size-1</button>
    </div>
  )
}

describe('useGridPagination', () => {
  it('returns early when disablePagination=true', () => {
    const rows = makeRows(['a', 'b'])

    const Disabled: React.FC = () => {
      const [, props] = useGridPagination(rows, { disablePagination: true })
      return <div data-testid="disabled">{String(props.paginationDisabled)}</div>
    }

    render(<Disabled />)
    expect(screen.getByTestId('disabled').textContent).toBe('true')
  })

  it('paginates rows with default page size (10) and initialPage=1', () => {
    const rows = makeRows(['a', 'b', 'c'])
    render(<Harness rows={rows} />)

    expect(screen.getByTestId('page-rows').textContent).toBe('a,b,c')
    expect(screen.getByTestId('current-page').textContent).toBe('1')
    expect(screen.getByTestId('pages-count').textContent).toBe('1')
  })

  it('goToPage clamps within bounds', () => {
    const rows = makeRows(['a', 'b', 'c', 'd'])
    render(<Harness rows={rows} config={{ rowsPerPage: 2 }} />)

    act(() => {
      screen.getByText('go-2').click()
    })

    expect(screen.getByTestId('current-page').textContent).toBe('2')
    expect(screen.getByTestId('page-rows').textContent).toBe('c,d')
  })

  it('updateRowsPerPage updates page size and recomputes page rows', () => {
    const rows = makeRows(['a', 'b', 'c'])
    render(<Harness rows={rows} config={{ rowsPerPage: 2 }} />)

    act(() => {
      screen.getByText('size-1').click()
    })

    expect(screen.getByTestId('rows-per-page').textContent).toBe('1')
    expect(screen.getByTestId('pages-count').textContent).toBe('3')
    expect(screen.getByTestId('page-rows').textContent).toBe('a')
  })

  it('returns all rows when controlledPagination=true', () => {
    const rows = makeRows(['a', 'b', 'c'])
    render(<Harness rows={rows} config={{ controlledPagination: true, rowsPerPage: 1 }} />)

    expect(screen.getByTestId('page-rows').textContent).toBe('a,b,c')
  })
})
