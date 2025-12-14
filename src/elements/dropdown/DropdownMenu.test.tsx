import React from 'react'
import { render, screen } from '../../test-utils'
import DropdownMenu from './DropdownMenu'

describe('DropdownMenu', () => {
    it('renders children and has dropdownMenu class', () => {
        const { container } = render(
            <DropdownMenu isOpen width={200}>
                <li>Item</li>
            </DropdownMenu>,
        )

        expect(screen.getByText('Item')).toBeInTheDocument()
        expect(container.querySelector('ul.dropdownMenu')).not.toBeNull()
    })
})
