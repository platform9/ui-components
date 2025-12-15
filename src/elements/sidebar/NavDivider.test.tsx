import React from 'react'
import { render, screen } from '../../test-utils'
import NavDivider from './NavDivider'

describe('NavDivider', () => {
    it('renders name and icon when provided', () => {
        const { container } = render(<NavDivider name="Section" icon={'gear' as any} />)
        expect(screen.getByText('Section')).toBeInTheDocument()
        expect(container.querySelector('i.fa-gear')).not.toBeNull()
    })
})
