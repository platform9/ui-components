import React from 'react'
import { render, screen } from '../../test-utils'
import NextButton from './NextButton'

describe('NextButton', () => {
    it('renders default label and shows forward icon by default', () => {
        const { container } = render(<NextButton />)
        const button = screen.getByRole('button', { name: 'Next' })

        expect(button).toHaveAttribute('data-testid', 'arrow-next')
        expect(container.querySelector('.button-right-icon')).toBeInTheDocument()
    })

    it('does not render the forward icon when showForward is false', () => {
        const { container } = render(<NextButton showForward={false} />)
        screen.getByRole('button', { name: 'Next' })

        expect(container.querySelector('.button-right-icon')).not.toBeInTheDocument()
    })
})
