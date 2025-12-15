import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import CardButton from './CardButton'

describe('CardButton', () => {
  it('renders with title and message', () => {
    render(
      <CardButton
        title="Test Title"
        message="Test Message"
        icon="test-icon"
      />
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Message')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()

    render(
      <CardButton
        title="Click Me"
        message="Click to test"
        icon="test-icon"
        onClick={handleClick}
      />
    )

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn()

    render(
      <CardButton
        title="Disabled Button"
        message="Should not click"
        icon="test-icon"
        disabled={true}
        onClick={handleClick}
      />
    )

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })


  it('renders with a string icon', () => {
    render(
      <CardButton
        title="Icon Test"
        message="Check icon style"
        icon="check"
      />
    )

    // Verify the icon element exists (FontAwesomeIcon renders an <i> tag)
    expect(screen.getByRole('button').querySelector('i')).toBeInTheDocument()
  })

})
