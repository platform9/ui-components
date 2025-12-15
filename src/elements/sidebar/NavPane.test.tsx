import React from 'react'
import { render, screen } from '../../test-utils'
import NavPane from './NavPane'

describe('NavPane', () => {
    it('renders title only when provided and omits bottomContent when not provided', () => {
        const { rerender } = render(
            <NavPane title="Main">
                <li>Top</li>
            </NavPane>,
        )

        expect(screen.getByText('Main')).toBeInTheDocument()
        expect(screen.getByText('Top')).toBeInTheDocument()
        expect(screen.queryByText('Bottom')).toBeNull()

        rerender(
            <NavPane>
                <li>Top</li>
            </NavPane>,
        )
        expect(screen.queryByText('Main')).toBeNull()
    })
})
