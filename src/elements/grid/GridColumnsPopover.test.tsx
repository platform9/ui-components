import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import GridColumnsPopover from './GridColumnsPopover'

describe('GridColumnsPopover', () => {
    it('opens menu and toggles a column', () => {
        const toggleColumn = jest.fn()
        render(
            <GridColumnsPopover
                {...({
                    columnTogglers: [
                        {
                            key: 'name',
                            label: 'Name',
                            visible: true,
                            disabled: false,
                            toggleColumn,
                        },
                    ],
                } as any)}
            />,
        )

        fireEvent.click(screen.getByText('Customize'))
        expect(screen.getByText('Name')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Name'))
        expect(toggleColumn).toHaveBeenCalledTimes(1)
    })
})
