import React from 'react'
import { render, screen } from '../test-utils'
import Alert from './Alert'

describe('Alert', () => {
    it('renders title and message', () => {
        render(<Alert title="Test Title" message="Test Message" />)
        expect(screen.getByText('Test Title')).toBeInTheDocument()
        expect(screen.getByText('Test Message')).toBeInTheDocument()
    })

    it('renders children', () => {
        render(
            <Alert>
                <div data-testid="child-content">Child Content</div>
            </Alert>
        )
        expect(screen.getByTestId('child-content')).toBeInTheDocument()
    })
})
