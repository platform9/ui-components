import React from 'react'
import { render } from '../../test-utils'
import TooltipListBody from './TooltipListBody'

describe('TooltipListBody', () => {
    it('renders each item using nameKey and renders a custom icon per row when renderIcon is provided', () => {
        const Icon = ({ name, className }: any) => (
            <i data-testid={`icon-${name}`} className={className} />
        )

        const { getByText, getByTestId } = render(
            (
                <TooltipListBody
                    items={[{ name: 'A' }, { name: 'B' }]}
                    nameKey="name"
                    renderIcon={Icon}
                />
            ) as any,
        )

        expect(getByText('A')).toBeInTheDocument()
        expect(getByText('B')).toBeInTheDocument()

        expect(getByTestId('icon-A')).toBeInTheDocument()
        expect(getByTestId('icon-B')).toBeInTheDocument()
    })
})
