import React from 'react'
import { render, screen } from '../../test-utils'
import Badges from './Badges'

describe('Badges', () => {
  it('renders with default props', () => {
    const testValues = [
      { key: 'label1', value: 'value1', text: 'label1=value1' },
      { key: 'label2', value: 'value2', text: 'label2=value2' },
    ]
    render(<Badges values={testValues} />)
    
    // Check if badges are rendered
    expect(screen.getByText('label1=value1')).toBeInTheDocument()
    expect(screen.getByText('label2=value2')).toBeInTheDocument()
  })

  it('limits number of visible badges when maxVisible is set', () => {
    const testValues = [
      { key: 'label1', value: 'value1', text: 'label1=value1' },
      { key: 'label2', value: 'value2', text: 'label2=value2' },
      { key: 'label3', value: 'value3', text: 'label3=value3' },
    ]
    render(<Badges values={testValues} maxVisible={2} />)
    
    // Only first two badges should be visible
    expect(screen.getByText('label1=value1')).toBeInTheDocument()
    expect(screen.getByText('label2=value2')).toBeInTheDocument()
    expect(screen.queryByText('label3=value3')).not.toBeInTheDocument()
  })
})
