import React from 'react'
import { render, screen } from '../../../test-utils'
import GridDefaultCell from './GridDefaultCell'

describe('GridDefaultCell', () => {
    it('renders children and applies title + grid-cell class', () => {
        render(
            <GridDefaultCell title="Full value">
                Cell value
            </GridDefaultCell>,
        )

        const el = screen.getByText('Cell value')
        expect(el).toBeInTheDocument()
        expect(el).toHaveAttribute('title', 'Full value')
        expect(el).toHaveClass('grid-cell')
    })
})
