import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import DropdownItem from './DropdownItem'

describe('DropdownItem', () => {
    it('invokes onClick and optionally renders a checkbox', () => {
        const onClick = jest.fn()
        const { container, rerender } = render(
            <DropdownItem onClick={onClick}>
                <span>Item</span>
            </DropdownItem>,
        )

        fireEvent.click(screen.getByText('Item'))
        expect(onClick).toHaveBeenCalledTimes(1)
        expect(container.querySelector('.checkbox')).toBeNull()

        rerender(
            <DropdownItem onClick={onClick} showCheckbox isSelected>
                <span>Item</span>
            </DropdownItem>,
        )
        expect(container.querySelector('.checkbox')).not.toBeNull()
    })
})
