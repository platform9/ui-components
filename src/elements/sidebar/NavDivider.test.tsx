import React from 'react'
import { render, screen } from '../../test-utils'
import NavDivider from './NavDivider'

describe('NavDivider', () => {
    it('renders the provided name', () => {
        render(<NavDivider name="Section" />)
        expect(screen.getByText('Section')).toBeInTheDocument()
    })
})
