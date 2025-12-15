import React from 'react'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import ListMenu from './ListMenu'

describe('ListMenu', () => {
    it('calls onClick with the selected item', async () => {
        const onClick = jest.fn()
        const list = [{ id: '1', name: 'Item 1' }]

        render(
            <ListMenu
                open
                anchor={<button type="button">Anchor</button>}
                onClose={jest.fn()}
                list={list}
                onClick={onClick}
            />,
        )

        await userEvent.click(screen.getByText('Item 1'))
        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClick).toHaveBeenCalledWith(list[0])
    })
})
