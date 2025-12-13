import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import RefreshButton from './RefreshButton'

describe('RefreshButton', () => {
    it('renders label and calls onRefresh when clicked', () => {
        const onRefresh = jest.fn()
        render(<RefreshButton onRefresh={onRefresh} />)

        expect(screen.getByText('Refresh')).toBeInTheDocument()

        const button = screen.getByTestId('refresh')
        fireEvent.click(button)

        expect(onRefresh).toHaveBeenCalledTimes(1)
    })
})
