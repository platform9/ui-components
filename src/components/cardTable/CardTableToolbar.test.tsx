import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import CardTableToolbar from './CardTableToolbar'

describe('CardTableToolbar', () => {
    it('calls onRefresh when refresh icon is clicked', () => {
        const onRefresh = jest.fn()
        render(
            <CardTableToolbar
                sorting={[]}
                filters={[]}
                filterValues={{}}
                onFilterUpdate={() => () => {}}
                onRefresh={onRefresh}
            />,
        )

        fireEvent.click(screen.getByLabelText('Refresh list'))
        expect(onRefresh).toHaveBeenCalledTimes(1)
    })

    it('calls onDirectionSwitch when direction icon is clicked', () => {
        const onDirectionSwitch = jest.fn()
        render(
            <CardTableToolbar
                sorting={[{ label: 'Name', field: 'name' }] as any}
                filters={[]}
                filterValues={{}}
                onFilterUpdate={() => () => {}}
                orderDirection="asc"
                onDirectionSwitch={onDirectionSwitch}
            />,
        )

        fireEvent.click(screen.getByLabelText('Change direction'))
        expect(onDirectionSwitch).toHaveBeenCalledTimes(1)
    })
})
