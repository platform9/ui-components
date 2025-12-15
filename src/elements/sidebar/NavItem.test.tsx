import React from 'react'
import { render, screen } from '../../test-utils'
import NavItem from './NavItem'

describe('NavItem', () => {
    it('shows label only when open=true', () => {
        const props: any = { name: 'Test Nav', link: { path: '/test' } }

        const { rerender } = render(<NavItem {...props} open={false} />)
        expect(screen.queryByText('Test Nav')).toBeNull()

        rerender(<NavItem {...props} open />)
        expect(screen.getByText('Test Nav')).toBeInTheDocument()
    })

    it('renders an external link with target blank and external icon when link.external=true', () => {
        const { container } = render(
            <NavItem
                name="Docs"
                open
                nestedLinks={[] as any}
                link={{ external: true, url: 'https://example.com', path: '' } as any}
            />,
        )

        const anchor = container.querySelector('a[href="https://example.com"]')
        expect(anchor).not.toBeNull()
        expect(anchor).toHaveAttribute('target', '_blank')
        expect(container.querySelector('i.fa-arrow-up-right-from-square')).not.toBeNull()
    })
})
