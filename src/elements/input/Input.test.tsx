import React from 'react'
import { render, screen } from '../../test-utils'
import Input from './Input'

describe('Input', () => {
  it('renders input label', () => {
    render(<Input label="Label" value="" onChange={() => {}} />)
    expect(screen.getByText('Label')).toBeInTheDocument()
  })
})
