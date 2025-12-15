import React from 'react'
import { render, screen } from '../../test-utils'
import Dropdown from './Dropdown'

describe('Dropdown', () => {
  it('renders dropdown label', () => {
    const items = [{ key: '1', label: 'One', value: 1 }]
    render(<Dropdown label="Dropdown" items={items} value={1} onChange={() => {}} />)
    expect(screen.getByText('Dropdown')).toBeInTheDocument()
  })
})
