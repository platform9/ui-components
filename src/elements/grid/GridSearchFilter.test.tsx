import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import GridSearchFilter from './GridSearchFilter'

describe('GridSearchFilter', () => {
    it('debounces and calls onChange with typed value', () => {
        jest.useFakeTimers()
        const onChange = jest.fn()
        render(<GridSearchFilter value="" onChange={onChange} />)

        fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'abc' } })

        jest.advanceTimersByTime(500)
        expect(onChange).toHaveBeenCalledWith('abc')
        jest.useRealTimers()
    })
})
