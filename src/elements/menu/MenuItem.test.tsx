import React from 'react'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import MenuItem from './MenuItem'

describe('MenuItem', () => {
    it('does not call onClick when readonly', async () => {
        const onClick = jest.fn()
        render(
            <MenuItem readonly onClick={onClick}>
                <span />
                Test Item
            </MenuItem>,
        )

        await userEvent.click(screen.getByText('Test Item'))
        expect(onClick).toHaveBeenCalledTimes(0)
    })
})
