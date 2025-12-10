import React from 'react'
import { render, screen } from '../test-utils'
import SubmitButton from './SubmitButton'

describe('SubmitButton', () => {
    it('renders with children text', () => {
        render(<SubmitButton>Submit Form</SubmitButton>)
        expect(screen.getByText('Submit Form')).toBeInTheDocument()
        expect(screen.getByText('Submit Form').closest('button')).toHaveAttribute('type', 'submit')
    })
})
