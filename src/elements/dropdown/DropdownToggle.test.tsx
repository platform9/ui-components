import React from 'react'
import { render, screen } from '../../test-utils'
import DropdownToggle from './DropdownToggle'

describe('DropdownToggle', () => {
    it('renders as a button', () => {
        render(<DropdownToggle>Toggle</DropdownToggle>)
        expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument()
    })
})
