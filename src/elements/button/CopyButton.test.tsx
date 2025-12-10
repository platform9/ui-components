import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import CopyButton from './CopyButton'

// Mock the document.execCommand API
const originalExecCommand = document.execCommand
const mockExecCommand = jest.fn()

beforeEach(() => {
  document.execCommand = mockExecCommand
  mockExecCommand.mockReset()
})

afterAll(() => {
  document.execCommand = originalExecCommand
})

describe('CopyButton', () => {
  it('renders with default text', () => {
    render(<CopyButton copyText="Text to copy" />)
    
    expect(screen.getByRole('button')).toHaveTextContent('Copy')
  })

})
