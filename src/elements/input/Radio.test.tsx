import React from 'react'
import { render, screen } from '../../test-utils'
import Radio from './Radio'

describe('Radio', () => {
  it('renders radio label', () => {
    render(<Radio checked={false} label="Text Here" />)
    expect(screen.getByText('Text Here')).toBeInTheDocument()
  })
})
