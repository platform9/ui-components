import React from 'react'
import { render, screen } from '../../../test-utils'
import GridLinkCell from './GridLinkCell'

describe('GridLinkCell', () => {
    it('renders a link when routeToFn returns a non-empty route', () => {
        render(
            <GridLinkCell item={{ id: '1' } as any} routeToFn={() => '/details/1'}>
                Test link
            </GridLinkCell>,
        )

        const link = screen.getByRole('link', { name: 'Test link' })
        expect(link).toHaveAttribute('href', '/details/1')
    })

    it('falls back to a non-link cell when routeToFn returns an empty route', () => {
        render(
            <GridLinkCell item={{}} routeToFn={() => ''}>
                Test link
            </GridLinkCell>,
        )

        expect(screen.queryByRole('link', { name: 'Test link' })).not.toBeInTheDocument()
        expect(screen.getByText('Test link')).toBeInTheDocument()
    })
})
