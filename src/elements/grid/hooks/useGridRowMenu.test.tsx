import React from 'react'
import { act, render, screen } from '../../../test-utils'
import useGridRowMenu, { isGridRowMenuHeader } from './useGridRowMenu'
import type { ParsedGridRow } from './useGridRows'

type Item = { id: string }

function makeRows(ids: string[]): Array<ParsedGridRow<Item>> {
  return ids.map((id) => ({
    key: id,
    item: { id },
    getCells: () => [],
  }))
}

const Harness: React.FC<{ rows: Array<ParsedGridRow<Item>>; config: any }> = ({ rows, config }) => {
  const [, props] = useGridRowMenu(rows, config)
  return (
    <div>
      <div data-testid="disabled">{String(props.rowMenuDisabled)}</div>
      <div data-testid="items-count">{String(props.rowMenuItems?.length || 0)}</div>
      <button
        onClick={() => {
          const item = rows[0].item
          const expandRow = jest.fn()
          const action = props.rowMenuItems?.find((i: any) => !isGridRowMenuHeader(i)) as any
          action?.triggerAction(item, expandRow)
        }}
      >
        trigger
      </button>
    </div>
  )
}

describe('useGridRowMenu', () => {
  it('isGridRowMenuHeader detects header items', () => {
    expect(isGridRowMenuHeader({ title: 'T' })).toBe(true)
    expect(isGridRowMenuHeader({ insertDivider: true })).toBe(true)
    expect(isGridRowMenuHeader({ label: 'X' })).toBe(false)
  })

  it('returns disabled when no rowMenuItems provided', () => {
    const rows = makeRows(['a'])

    const NoItems: React.FC = () => {
      const [, props] = useGridRowMenu(rows, {})
      return <div data-testid="disabled">{String(props.rowMenuDisabled)}</div>
    }

    render(<NoItems />)
    expect(screen.getByTestId('disabled').textContent).toBe('true')
  })

  it('creates rowMenuItems and triggers refresh/onComplete on success', async () => {
    const rows = makeRows(['a'])
    const onRefresh = jest.fn()
    const onComplete = jest.fn()
    const handleClick = jest.fn().mockResolvedValue(true)

    render(
      <Harness
        rows={rows}
        config={{
          onRefresh,
          rowMenuItems: [
            { title: 'Header' },
            {
              label: 'Do',
              handleClick,
              refreshAfterSuccess: true,
              onComplete,
            },
          ],
        }}
      />,
    )

    expect(screen.getByTestId('disabled').textContent).toBe('false')
    expect(screen.getByTestId('items-count').textContent).toBe('2')

    await act(async () => {
      screen.getByText('trigger').click()
    })

    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(onRefresh).toHaveBeenCalledWith(true)
    expect(onComplete).toHaveBeenCalledWith(true, { id: 'a' })
  })

  it('getIsDisabled returns true when cond fails', () => {
    const rows = makeRows(['a'])

    const CondHarness: React.FC = () => {
      const [, props] = useGridRowMenu(rows, {
        rowMenuItems: [
          {
            label: 'Do',
            cond: () => false,
          },
        ],
      })

      const itemProps = props.rowMenuItems?.[0] as any
      return <div data-testid="disabled-item">{String(itemProps.getIsDisabled(rows[0].item))}</div>
    }

    render(<CondHarness />)
    expect(screen.getByTestId('disabled-item').textContent).toBe('true')
  })
})
