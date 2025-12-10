import React from 'react'
import { render } from '../../test-utils'
import SingleAreaChart from './SingleAreaChart'

// Mock ResizeObserver which is required by ResponsiveContainer from recharts
beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }
})

describe('SingleAreaChart', () => {
    it('renders correctly', () => {
        render(
            <SingleAreaChart
                values={[]}
                xAxis="x"
                dataKey="value"
            />
        )
    })
})
