import React from 'react'
import { render } from '../../test-utils'
import SemiCircleGraph from './SemiCircleGraph'

jest.mock('./PieGraph', () => {
    const spy = jest.fn((_props: any) => null)
    ;(globalThis as any).__pieGraphMock = spy
    return {
        __esModule: true,
        default: (props: any) => spy(props),
    }
})

describe('SemiCircleGraph', () => {
    it('renders PieGraph with semicircle angles and computed height', () => {
        render(<SemiCircleGraph sideLength={200} data={[]} />)

        const pieGraphMock = (globalThis as any).__pieGraphMock as jest.Mock

        expect(pieGraphMock).toHaveBeenCalledWith(
            expect.objectContaining({
                sideLength: 200,
                startAngle: 180,
                endAngle: 0,
                height: 120,
            }),
        )
    })
})
