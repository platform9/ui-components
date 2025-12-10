import React from 'react'
import { render } from '../../test-utils'
import CheckboxField from './CheckboxField'
import ValidatedForm from './ValidatedForm'

describe('CheckboxField', () => {
    it('renders correctly', () => {
        render(
            <ValidatedForm>
                <CheckboxField id="test-checkbox" />
            </ValidatedForm>
        )
    })
})
