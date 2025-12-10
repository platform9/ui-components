import React from 'react'
import { render, screen } from '../test-utils'
import SimpleLink from './SimpleLink'

describe('SimpleLink', () => {
    it('renders link', () => {
        render(<SimpleLink src="/home">Home</SimpleLink>)
        const link = screen.getByText('Home')
        expect(link.closest('a')).toHaveAttribute('href', '/home')
    })

    it('renders icon', () => {
        const { container } = render(<SimpleLink src="/home" icon="home">Home</SimpleLink>)
        expect(container.querySelector('.fa-home')).toBeInTheDocument()
    })
})
