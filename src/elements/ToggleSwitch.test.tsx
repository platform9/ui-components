import React from 'react'
import { render, screen } from '../test-utils'
import ToggleSwitch from './ToggleSwitch'

describe('ToggleSwitch', () => {
  it('renders toggle label', () => {
    render(<ToggleSwitch active={false} onClick={() => {}} label="Text Here" />)
    expect(screen.getByText('Text Here')).toBeInTheDocument()
  })
})
