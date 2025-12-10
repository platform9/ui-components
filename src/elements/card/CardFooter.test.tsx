import React from 'react'
import { render, screen } from '../../test-utils'
import CardFooter from './CardFooter'

describe('CardFooter', () => {
  it('renders with children', () => {
    render(
      <CardFooter>
        <div data-testid="test-footer">Footer Content</div>
      </CardFooter>
    )
    
    expect(screen.getByTestId('test-footer')).toBeInTheDocument()
  })
})
