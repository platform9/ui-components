import React from 'react'
import { render, screen } from '../../test-utils'
import DropdownLabel from './DropdownLabel'

describe('DropdownLabel', () => {
    it('renders a label element with text', () => {
        render(<DropdownLabel>Label</DropdownLabel>)
        const label = screen.getByText('Label')
        expect(label.tagName.toLowerCase()).toBe('label')
    })
})
