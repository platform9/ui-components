import React from 'react'
import { render, screen } from '../../test-utils'
import { ErrorMessage } from './ErrorMessage'

describe('ErrorMessage', () => {
    it('renders the message and icon when children are provided', () => {
        const { container } = render(<ErrorMessage>Test error message</ErrorMessage>)
        expect(screen.getByText('Test error message')).toBeInTheDocument()
        expect(container.querySelector('i.fa-exclamation-circle')).not.toBeNull()
    })

    it('renders nothing when children are not provided', () => {
        const { container } = render(<ErrorMessage>{null}</ErrorMessage>)
        expect(container).toBeEmptyDOMElement()
    })
})
