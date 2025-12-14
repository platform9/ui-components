import React from 'react'
import { render } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import Menu from './Menu'

describe('Menu', () => {
    it('calls onClose when clicking outside the menu', async () => {
        const onClose = jest.fn()
        render(
            <Menu open anchor={<button type="button">Anchor</button>} onClose={onClose}>
                <div>Item</div>
            </Menu>,
        )

        await userEvent.click(document.body)
        expect(onClose).toHaveBeenCalledTimes(0)

        await userEvent.click(document.body)
        expect(onClose).toHaveBeenCalledTimes(1)
    })
})
