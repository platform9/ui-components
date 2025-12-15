import React from 'react'
import { render, screen } from '../../test-utils'
import SingleAreaChart from './SingleAreaChart'

jest.mock('recharts', () => {
    const responsiveContainerSpy = jest.fn()
    const xAxisSpy = jest.fn()
    const areaSpy = jest.fn()
    ;(globalThis as any).__singleAreaChartResponsiveSpy = responsiveContainerSpy
    ;(globalThis as any).__singleAreaChartXAxisSpy = xAxisSpy
    ;(globalThis as any).__singleAreaChartAreaSpy = areaSpy

    return {
        ResponsiveContainer: (props: any) => {
            responsiveContainerSpy(props)
            return <div data-testid="responsive">{props.children}</div>
        },
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
        Legend: () => <div data-testid="legend" />,
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

describe('SingleAreaChart', () => {
    it('wires recharts props (xAxis, dataKey, height) correctly', () => {
        render(<SingleAreaChart values={[{ x: 't1', value: 1 }]} xAxis="x" dataKey="value" height={123} />)

        const responsiveContainerSpy = (globalThis as any).__singleAreaChartResponsiveSpy as jest.Mock
        const xAxisSpy = (globalThis as any).__singleAreaChartXAxisSpy as jest.Mock
        const areaSpy = (globalThis as any).__singleAreaChartAreaSpy as jest.Mock

        expect(screen.getByTestId('responsive')).toBeInTheDocument()
        expect(screen.getByTestId('areachart')).toBeInTheDocument()

        expect(responsiveContainerSpy).toHaveBeenCalledWith(expect.objectContaining({ height: 123, width: '100%' }))
        expect(xAxisSpy).toHaveBeenCalledWith(expect.objectContaining({ dataKey: 'x' }))
        expect(areaSpy).toHaveBeenCalledWith(expect.objectContaining({ dataKey: 'value' }))
    })
})
