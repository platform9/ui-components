import React from 'react'
import { render, screen } from '../../test-utils'
import PieGraph from './PieGraph'

jest.mock('recharts', () => ({
    PieChart: ({ children }: any) => <div data-testid="piechart">{children}</div>,
    Pie: ({ children }: any) => <div data-testid="pie">{children}</div>,
    Cell: () => <div data-testid="cell" />,
}))

describe('PieGraph', () => {
    it('renders percent label and primary label when provided', () => {
        render(
            <PieGraph
                data={[{ name: 'ok', value: 1, color: 'primary' } as any]}
                percent={0.5}
                primary="Healthy"
            />,
        )

        expect(screen.getByText('50%')).toBeInTheDocument()
        expect(screen.getByText('Healthy')).toBeInTheDocument()
        expect(screen.getByTestId('piechart')).toBeInTheDocument()
    })
})
