import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import PrevButton from './PrevButton'

describe('PrevButton', () => {
    it('renders default label and left icon', () => {
        const { container } = render(<PrevButton />)
        const button = screen.getByRole('button', { name: 'Back' })

        expect(button).toHaveAttribute('data-testid', 'arrow-previous')
        expect(container.querySelector('.button-icon')).toBeInTheDocument()
    })

    it('does not call onClick when disabled', () => {
        const onClick = jest.fn()
        render(
            <PrevButton disabled onClick={onClick}>
                Back
            </PrevButton>,
        )

        const button = screen.getByRole('button', { name: 'Back' })
        fireEvent.click(button)

        expect(onClick).not.toHaveBeenCalled()
    })
})
