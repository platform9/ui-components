import React from 'react'
import { render, screen } from '../../test-utils'
import CardBody from './CardBody'

describe('CardBody', () => {
  it('renders with children', () => {
    render(
      <CardBody>
        <div data-testid="test-content">Test Content</div>
      </CardBody>
    )
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })
})
