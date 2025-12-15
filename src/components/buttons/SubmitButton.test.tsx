import React from 'react'
import { render, screen } from '../../test-utils'
import SubmitButton from './SubmitButton'

describe('SubmitButton', () => {
    it('renders default label, has type=submit, and generates a data-testid', () => {
        render(<SubmitButton />)

        const button = screen.getByRole('button', { name: 'Submit' })
        expect(button).toHaveAttribute('type', 'submit')
        expect(button).toHaveAttribute('data-testid', 'submitbtn')
    })

    it('includes children in the generated data-testid', () => {
        render(<SubmitButton>Save</SubmitButton>)

        const button = screen.getByRole('button', { name: 'Save' })
        expect(button).toHaveAttribute('data-testid', 'save-submitbtn')
    })
})
