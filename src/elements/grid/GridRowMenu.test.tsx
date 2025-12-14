import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import GridRowMenu from './GridRowMenu'

describe('GridRowMenu', () => {
    it('renders a single row action button and triggers it on click', () => {
        const triggerAction = jest.fn()
        const RowMenuButton = ({ children, onClick }: any) => (
            <button type="button" onClick={onClick}>
                {children}
            </button>
        )
        const item = { id: 1 }
        render(
            <GridRowMenu
                item={item}
                rowMenuItems={[
                    {
                        key: 'edit',
                        label: 'Edit',
                        icon: 'pencil',
                        RowMenuButton,
                        getIsDisabled: () => false,
                        triggerAction,
                    },
                ] as any}
                rowMenuDisabled={false}
            />,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
        expect(triggerAction).toHaveBeenCalledWith(item, undefined)
    })
})
