import React from 'react'
import { render, screen } from '../test-utils'
import ExternalLink from './ExternalLink'

describe('ExternalLink', () => {
    it('renders link with target _blank', () => {
        render(<ExternalLink url="https://example.com" />)
        const link = screen.getByText('https://example.com')
        expect(link).toBeInTheDocument()
        expect(link.closest('a')).toHaveAttribute('target', '_blank')
        expect(link.closest('a')).toHaveAttribute('href', 'https://example.com')
    })

    it('renders children', () => {
        render(<ExternalLink url="https://example.com">Go to Example</ExternalLink>)
        expect(screen.getByText('Go to Example')).toBeInTheDocument()
    })
})
