import React from 'react'
import { render, screen } from '../../test-utils'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('renders checkbox label', () => {
    render(<Checkbox checked={false} label="Text Here" />)
    expect(screen.getByText('Text Here')).toBeInTheDocument()
  })
})
