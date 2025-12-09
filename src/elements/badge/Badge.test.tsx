import React from 'react'
import { render, screen } from '../../test-utils'
import Badge from './Badge'

describe('Badge', () => {
  it('renders badge text', () => {
    render(<Badge text="Beta Tester" variant="primary" />)
    expect(screen.getByText('Beta Tester')).toBeInTheDocument()
  })
})
