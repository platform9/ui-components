import React from 'react'
import { render, screen } from '../../test-utils'
import Button from './Button'

describe('Button', () => {
  it('renders button label', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })
})
