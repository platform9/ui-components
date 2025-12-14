import React from 'react'
import { render, screen } from '../../test-utils'
import NavPane from './NavPane'

describe('NavPane', () => {
    it('renders title and bottomContent when provided', () => {
        render(
            <NavPane title="Main" bottomContent={[<li key="b">Bottom</li>] as any}>
                <li>Top</li>
            </NavPane>,
        )

        expect(screen.getByText('Main')).toBeInTheDocument()
        expect(screen.getByText('Top')).toBeInTheDocument()
        expect(screen.getByText('Bottom')).toBeInTheDocument()
    })
})
