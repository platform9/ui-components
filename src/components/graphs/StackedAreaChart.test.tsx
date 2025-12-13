import React from 'react'
import { render, screen } from '../../test-utils'
import StackedAreaChart from './StackedAreaChart'

jest.mock('recharts', () => {
    const xAxisSpy = jest.fn()
    const areaSpy = jest.fn()
    ;(globalThis as any).__stackedAreaChartXAxisSpy = xAxisSpy
    ;(globalThis as any).__stackedAreaChartAreaSpy = areaSpy

    return {
        ResponsiveContainer: ({ children }: any) => <div data-testid="responsive">{children}</div>,
        AreaChart: ({ children }: any) => <div data-testid="areachart">{children}</div>,
        Area: (props: any) => {
            areaSpy(props)
            return <div data-testid="area" />
        },
        XAxis: (props: any) => {
            xAxisSpy(props)
            return <div data-testid="xaxis" />
        },
        YAxis: () => <div data-testid="yaxis" />,
        CartesianGrid: () => <div data-testid="grid" />,
        Tooltip: () => <div data-testid="tooltip" />,
    }
})

// Mock ResizeObserver which is required by ResponsiveContainer from recharts
beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }
})

describe('StackedAreaChart', () => {
    it('renders an Area for each key and passes xAxis dataKey', () => {
        render(
            <StackedAreaChart
                values={[{ time: 't1', warning: 1, critical: 2 }] as any}
                xAxis="time"
                keys={[
                    { name: 'warning', color: 'warning' },
                    { name: 'critical', color: 'critical' },
                ] as any}
            />,
        )

        const xAxisSpy = (globalThis as any).__stackedAreaChartXAxisSpy as jest.Mock
        const areaSpy = (globalThis as any).__stackedAreaChartAreaSpy as jest.Mock

        expect(screen.getByTestId('areachart')).toBeInTheDocument()
        expect(xAxisSpy).toHaveBeenCalledWith(expect.objectContaining({ dataKey: 'time' }))

        // Two keys -> two Area calls
        expect(areaSpy).toHaveBeenCalledTimes(2)
        expect(areaSpy).toHaveBeenNthCalledWith(1, expect.objectContaining({ dataKey: 'warning' }))
        expect(areaSpy).toHaveBeenNthCalledWith(2, expect.objectContaining({ dataKey: 'critical' }))
    })
})
