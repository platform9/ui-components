import React from 'react'
import { render, screen } from '../../test-utils'
import Stepper from './Stepper'

describe('Stepper', () => {
  it('renders step labels', () => {
    const steps = [
      { label: 'Step 1', content: 'Content 1' },
      { label: 'Step 2', content: 'Content 2' },
    ]

    render(<Stepper activeStep={1} steps={steps} />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
  })
})
