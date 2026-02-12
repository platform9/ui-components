import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import IconButton from './IconButton'

describe('IconButton', () => {
  it('renders with default icon', () => {
    render(<IconButton icon="test-icon" size="large" />)
    
    const button = screen.getByRole('button')
    
    expect(button).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    
    render(<IconButton icon="test-icon" onClick={handleClick} size="large" />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

})
