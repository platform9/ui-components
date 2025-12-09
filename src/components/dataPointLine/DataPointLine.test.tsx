import React from 'react'
import { render, screen } from '../../test-utils'
import DataPointLine from './DataPointLine'
import DataPoint from './DataPoint'

describe('DataPointLine', () => {
  it('renders data points', () => {
    render(
      <DataPointLine lineColor="red">
        <DataPoint description="0%" percent={0} />
      </DataPointLine>,
    )

    expect(screen.getByText('0%')).toBeInTheDocument()
  })
})
