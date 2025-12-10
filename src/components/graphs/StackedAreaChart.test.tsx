import React from 'react'
import { render } from '../../test-utils'
import StackedAreaChart from './StackedAreaChart'

// Mock ResizeObserver which is required by ResponsiveContainer from recharts
beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }
})

describe('StackedAreaChart', () => {
    it('renders correctly', () => {
        render(
            <StackedAreaChart
                values={[]}
                xAxis="time"
                keys={[]}
            />
        )
    })
})
