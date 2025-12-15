import React from 'react'
import { render, screen } from '../test-utils'
import Text from './Text'

describe('Text', () => {
    it('renders default variant (body1) as paragraph', () => {
        render(<Text>Default Text</Text>)
        const element = screen.getByText('Default Text')
        expect(element.tagName).toBe('P')
        // Actually looking at code: variant='body1' -> variantMap['body1']='p'
        // ERROR in thought: I should verify what 'body1' maps to in the file.
        // Line 29: body1: 'p'
        // So it should be 'P'.
        // However, if I am wrong, I will debug.
        expect(element).toBeInTheDocument()
    })

    it('renders h1 variant correctly', () => {
        render(<Text variant="h1">Header Text</Text>)
        const element = screen.getByText('Header Text')
        expect(element.tagName).toBe('H1')
    })

    it('renders custom component', () => {
        render(<Text component="span">Span Text</Text>)
        const element = screen.getByText('Span Text')
        expect(element.tagName).toBe('SPAN')
    })

    it('renders with children', () => {
        render(<Text><span>Child</span></Text>)
        expect(screen.getByText('Child')).toBeInTheDocument()
    })
})
