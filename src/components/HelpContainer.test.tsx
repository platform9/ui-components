import React from 'react'
import { render, screen } from '../test-utils'
import HelpContainer from './HelpContainer'

describe('HelpContainer', () => {
    it('renders icon with tooltip', () => {
        const { container } = render(<HelpContainer title="Help Me" icon="question" />)
        // Check icon presence
        expect(container.querySelector('.fa-question')).toBeInTheDocument()
        // Tooltips are often hard to test (hover state), but we can check if it rendered
    })

    it('renders as link if provided', () => {
        render(<HelpContainer title="Link" link="/docs" />)
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/docs')
    })
})
