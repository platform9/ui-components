import React from 'react'
import { render, screen } from '../../test-utils'
import KeyValuesField from './KeyValuesField'
import ValidatedForm from './ValidatedForm'

describe('KeyValuesField', () => {
    it('renders required label with asterisk and default add label', () => {
        render(
            <ValidatedForm>
                <KeyValuesField id="test-keyvalues" label="Tags" required />
            </ValidatedForm>
        )

        expect(screen.getByText('Tags *')).toBeInTheDocument()
        expect(screen.getByText('Add Tags')).toBeInTheDocument()
    })
})
