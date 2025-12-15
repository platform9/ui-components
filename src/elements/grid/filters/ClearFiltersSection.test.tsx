import React from 'react'
import { render, screen } from '../../../test-utils'
import userEvent from '@testing-library/user-event'
import ClearFiltersSection from './ClearFiltersSection'

describe('ClearFiltersSection', () => {
    it("calls onChange([]) when clicking Clear Filters", async () => {
        const onChange = jest.fn()
        render(<ClearFiltersSection onChange={onChange} />)

        await userEvent.click(screen.getByText('Clear Filters'))
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith([])
    })
})
