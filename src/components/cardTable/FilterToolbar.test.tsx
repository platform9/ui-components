import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import FilterToolbar from './FilterToolbar'

describe('FilterToolbar', () => {
    it('calls onRefresh and onSearchChange', () => {
        const onRefresh = jest.fn()
        const onSearchChange = jest.fn()

        render(
            <FilterToolbar
                searchTerm=""
                onSearchChange={onSearchChange}
                onRefresh={onRefresh}
            />,
        )

        fireEvent.click(screen.getByTestId('refresh'))
        expect(onRefresh).toHaveBeenCalledTimes(1)

        fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'abc' } })
        expect(onSearchChange).toHaveBeenCalledWith('abc')
    })
})
