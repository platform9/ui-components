import React from 'react'
import { render, screen } from '../test-utils'
import MultiToggleSwitch from './MultiToggleSwitch'

describe('MultiToggleSwitch', () => {
  it('renders options', () => {
    render(
      <MultiToggleSwitch
        options={[
          { label: 'Monthly', value: 'monthly' },
          { label: 'Hourly', value: 'hourly' },
        ]}
        value="monthly"
        onClick={() => {}}
      />,
    )
    expect(screen.getByText('Monthly')).toBeInTheDocument()
  })
})
