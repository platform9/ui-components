import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import CancelButton from './CancelButton'

describe('CancelButton', () => {
    it('renders default label and calls onClick when clicked', () => {
        const onClick = jest.fn()
        render(<CancelButton onClick={onClick} />)

        const button = screen.getByRole('button', { name: 'Cancel' })
        fireEvent.click(button)

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
        const onClick = jest.fn()
        render(
            <CancelButton disabled onClick={onClick}>
                Cancel
            </CancelButton>,
        )

        const button = screen.getByRole('button', { name: 'Cancel' })
        fireEvent.click(button)

        expect(onClick).not.toHaveBeenCalled()
    })
})
