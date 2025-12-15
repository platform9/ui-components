import React from 'react'
import { render, screen } from '../../test-utils'
import FormFieldSection from './FormFieldSection'

describe('FormFieldSection', () => {
    it('renders title, step, link, and error message', () => {
        render(
            <FormFieldSection
                title="Section Title"
                step={1}
                link={<a href="/help">Help</a>}
                errorMessage="Something went wrong"
            >
                <div>Section Body</div>
            </FormFieldSection>,
        )

        expect(screen.getByText('Section Title')).toBeInTheDocument()
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Help' })).toHaveAttribute('href', '/help')
        expect(screen.getByText('Section Body')).toBeInTheDocument()
        expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })
})
