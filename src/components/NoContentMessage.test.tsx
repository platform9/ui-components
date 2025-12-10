import React from 'react'
import { render, screen } from '../test-utils'
import NoContentMessage from './NoContentMessage'

describe('NoContentMessage', () => {
    it('renders message', () => {
        render(<NoContentMessage message="No data available" />)
        expect(screen.getByText('No data available')).toBeInTheDocument()
    })

    it('renders children if no message', () => {
        render(<NoContentMessage><div>Child Content</div></NoContentMessage>)
        expect(screen.getByText('Child Content')).toBeInTheDocument()
    })
})
