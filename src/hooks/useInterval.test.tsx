import React, { useState } from 'react'
import { act, render, screen } from '../test-utils'
import useInterval from './useInterval'

describe('useInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('calls the latest callback on an interval', () => {
    const Harness: React.FC = () => {
      const [count, setCount] = useState(0)
      useInterval(() => setCount((c) => c + 1), 10)
      return <div data-testid="count">{String(count)}</div>
    }

    render(<Harness />)

    expect(screen.getByTestId('count').textContent).toBe('0')

    act(() => {
      jest.advanceTimersByTime(25)
    })

    expect(screen.getByTestId('count').textContent).toBe('2')
  })
})
