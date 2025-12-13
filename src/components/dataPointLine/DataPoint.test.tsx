import React from 'react'
import { render, screen } from '../../test-utils'
import DataPoint from './DataPoint'

describe('DataPoint', () => {
    it('renders the description and applies left positioning based on percent', () => {
        const { container } = render(
            <DataPoint description="Hello" percent={25} circleColor="#ff0000" />,
        )

        expect(screen.getByText('Hello')).toBeInTheDocument()

        const root = container.firstChild as HTMLElement
        expect(root).toHaveStyle({ left: '25%' })
    })
})
