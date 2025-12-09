import React from 'react'
import { render, screen } from '../../test-utils'
import MultiDropdown from './MultiDropdown'

describe('MultiDropdown', () => {
  it('renders multi dropdown label', () => {
    const items = [{ key: '1', label: 'One', value: 1 }]
    render(<MultiDropdown label="Multi" items={items} value={[1]} onChange={() => {}} />)
    expect(screen.getByText('Multi')).toBeInTheDocument()
  })
})
