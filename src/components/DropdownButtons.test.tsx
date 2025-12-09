import React from 'react'
import { render, screen } from '../test-utils'
import DropdownButtons from './DropdownButtons'

describe('DropdownButtons', () => {
  it('renders dropdown buttons label', () => {
    const buttons = [
      { label: 'Edit', icon: 'edit' },
      { label: 'Delete', icon: 'trash' },
    ]

    render(<DropdownButtons label="Actions" buttons={buttons} />)
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })
})
