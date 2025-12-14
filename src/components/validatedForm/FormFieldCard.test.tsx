import React from 'react'
import { render, screen } from '../../test-utils'
import { FormFieldCard } from './FormFieldCard'

describe('FormFieldCard', () => {
    it('renders title, step indicator, and children', () => {
        const { container } = render(
            <FormFieldCard title="Test Card" step={2}>
                <div>Test content</div>
            </FormFieldCard>,
        )

        expect(screen.getByText('Test Card')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('Test content')).toBeInTheDocument()

        expect(container.querySelector('.form-field-card-requirementsTitle')).not.toBeNull()
    })
})
