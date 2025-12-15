import React from 'react'
import { render, screen } from '../../test-utils'
import Card from './Card'

describe('Card', () => {
  it('renders with title and children', () => {
    render(
      <Card title="Test Title">
        <div data-testid="card-content">Card Content</div>
      </Card>
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
  })
})
