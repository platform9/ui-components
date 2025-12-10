import React from 'react'
import { render } from '../../test-utils'
import KeyValuesField from './KeyValuesField'
import ValidatedForm from './ValidatedForm'

describe('KeyValuesField', () => {
    it('renders correctly', () => {
        render(
            <ValidatedForm>
                <KeyValuesField id="test-keyvalues" />
            </ValidatedForm>
        )
    })
})
