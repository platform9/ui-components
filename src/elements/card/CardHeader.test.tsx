import React from 'react'
import { render, screen } from '../../test-utils'
import CardHeader from './CardHeader'

describe('CardHeader', () => {
  it('renders with children', () => {
    render(<CardHeader>Test Header</CardHeader>)
    expect(screen.getByText('Test Header')).toBeInTheDocument()
  })
})
