import React from 'react'
import { act, render, screen } from '../test-utils'
import useToggler from './useToggler'

const Harness: React.FC = () => {
  const [active, toggle, setValue, getValueSetter] = useToggler(false)

  return (
    <div>
      <div data-testid="active">{String(active)}</div>
      <button onClick={() => toggle()}>toggle</button>
      <button onClick={() => setValue(true)}>set-true</button>
      <button onClick={getValueSetter(false)}>set-false</button>
    </div>
  )
}

describe('useToggler', () => {
  it('toggles and assigns values', () => {
    render(<Harness />)

    expect(screen.getByTestId('active').textContent).toBe('false')

    act(() => {
      screen.getByText('toggle').click()
    })
    expect(screen.getByTestId('active').textContent).toBe('true')

    act(() => {
      screen.getByText('set-false').click()
    })
    expect(screen.getByTestId('active').textContent).toBe('false')

    act(() => {
      screen.getByText('set-true').click()
    })
    expect(screen.getByTestId('active').textContent).toBe('true')
  })
})
