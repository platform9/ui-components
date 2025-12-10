import React from 'react'
import { render, screen } from '../../test-utils'
import Crumb from './Crumb'

describe('Crumb', () => {
  it('renders crumb with name', () => {
    render(
      <Crumb 
        name="Test Page" 
        path="/test" 
        active={false} 
        icon="test-icon"
        textVariant="body2"
      />
    )
    
    expect(screen.getByText('Test Page')).toBeInTheDocument()
  })

  it('renders with left icon when provided', () => {
    const leftIcon = <span data-testid="left-icon">←</span>
    render(
      <Crumb 
        name="With Icon" 
        path="/with-icon" 
        active={false} 
        icon="test-icon"
        leftIcon={leftIcon}
        textVariant="body2"
      />
    )
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })
})
