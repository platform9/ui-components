import React from 'react'
import { render, screen } from '../test-utils'
import PasswordValidationDisplay from './PasswordValidationDisplay'

describe('PasswordValidationDisplay', () => {
    it('renders correctly with default validations', () => {
        const values = { newPassword: 'password' }
        render(<PasswordValidationDisplay values={values} />)

        expect(screen.getByText('Password must contain the following:')).toBeInTheDocument()
        expect(screen.getByText('At least 8 characters long')).toBeInTheDocument()
    })

    // We could test if icons change based on validation, but that depends on visual inspection of icons (check vs times)
    // For basic test, rendering is key.
})
