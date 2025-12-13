import React from 'react'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import CloseButton from './CloseButton'

describe('CloseButton', () => {
    it('renders a button when `to` is not provided', () => {
        render(<CloseButton aria-label="Close" />)
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
        expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('wraps the icon in a link when `to` is provided', () => {
        render(<CloseButton to="/home" aria-label="Close" />)
        expect(screen.getByRole('link')).toHaveAttribute('href', '/home')
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    })

    it('shows tooltip message on hover', async () => {
        render(<CloseButton tooltip="Cancel" aria-label="Close" />)
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

        await userEvent.hover(screen.getByRole('button', { name: 'Close' }))
        expect(await screen.findByRole('tooltip')).toHaveTextContent('Cancel')
    })
})
