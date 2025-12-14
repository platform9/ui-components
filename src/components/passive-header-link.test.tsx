import React from 'react'
import { fireEvent, render, screen } from '../test-utils'
import PassiveHeaderLink from './passive-header-link'

describe('passive-header-link', () => {
    it('renders as a link and invokes onClick', () => {
        const onClick = jest.fn()
        render(
            <PassiveHeaderLink
                {...({
                    icon: 'external-link',
                    text: 'Docs',
                    url: '/docs',
                    onClick,
                } as any)}
            />,
        )

        const link = screen.getByRole('link', { name: 'Docs' })
        expect(link).toHaveAttribute('href', '/docs')

        fireEvent.click(link)
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
