import React from 'react'
import { render, screen } from '../../test-utils'
import CardHeaderWithLink from './CardHeaderWithLink'

describe('CardHeaderWithLink', () => {
    it('renders header text and link component', () => {
        render(
            <CardHeaderWithLink {...({ linkComponent: <a href="/docs">Docs</a> } as any)}>
                Header
            </CardHeaderWithLink>,
        )

        expect(screen.getByText('Header')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs')
    })
})
