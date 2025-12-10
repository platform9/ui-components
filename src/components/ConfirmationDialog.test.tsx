import React from 'react'
import { render, fireEvent, screen } from '../test-utils'
import ConfirmationDialog from './ConfirmationDialog'

// Mocking elements used inside
jest.mock('../elements/modal', () => {
    return ({ children, open, title, footer, onClose }: any) => {
        if (!open) return null
        return (
            <div data-testid="mock-modal">
                <h1>{title}</h1>
                <div data-testid="modal-content">{children}</div>
                <div data-testid="modal-footer">{footer}</div>
                <button onClick={onClose}>Close</button>
            </div>
        )
    }
})

describe('ConfirmationDialog', () => {
    it('renders correctly when open', () => {
        render(
            <ConfirmationDialog
                open={true}
                title="Confirm This"
                text="Are you sure?"
                onConfirm={() => { }}
                onCancel={() => { }}
            />
        )
        expect(screen.getByTestId('mock-modal')).toBeInTheDocument()
        expect(screen.getByText('Confirm This')).toBeInTheDocument()
        expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    })

    it('renders cancel and confirm buttons with default text', () => {
        render(
            <ConfirmationDialog
                open={true}
                onConfirm={() => { }}
                onCancel={() => { }}
            />
        )
        const footer = screen.getByTestId('modal-footer')
        expect(footer).toHaveTextContent('Cancel')
        expect(footer).toHaveTextContent('Confirm')
    })

    // Since we mocked Modal, we might not be testing the real button interactions fully
    // if custom headers/footers were complex, but for basic ensuring props exist, this is good.
})
