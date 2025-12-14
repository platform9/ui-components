import React from 'react'
import { fireEvent, render, screen } from '../test-utils'
import AutocompleteBase from './AutocompleteBase'

describe('AutocompleteBase', () => {
    it('filters suggestions and propagates selection', () => {
        const onChange = jest.fn()
        render(
            <AutocompleteBase
                label="Search"
                value=""
                onChange={onChange}
                suggestions={['apple', 'banana']}
            />,
        )

        const input = screen.getByPlaceholderText('Search')
        fireEvent.change(input, { target: { value: 'app' } })

        expect(screen.getByText('apple')).toBeInTheDocument()
        expect(screen.queryByText('banana')).not.toBeInTheDocument()

        fireEvent.mouseDown(screen.getByText('apple'))
        expect(onChange).toHaveBeenLastCalledWith('apple')
    })
})
