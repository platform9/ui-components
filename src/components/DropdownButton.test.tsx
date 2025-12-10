import React from 'react'
import { render, screen } from '../test-utils'
import DropdownButton from './DropdownButton'

describe('DropdownButton', () => {
    it('renders button with text and links', () => {
        const links = [
            { label: 'Link 1', link: '/link1' },
            { label: 'Link 2', link: '/link2' },
        ]
        render(<DropdownButton addText="Menu" links={links} />)

        expect(screen.getByText('Menu')).toBeInTheDocument()
        // Links are hidden by default (opacity 0) but exist in DOM
        expect(screen.getByText('Link 1')).toBeInTheDocument()
        expect(screen.getByText('Link 2')).toBeInTheDocument()
    })
})
