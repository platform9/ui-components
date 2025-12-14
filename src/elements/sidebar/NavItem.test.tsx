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
})
