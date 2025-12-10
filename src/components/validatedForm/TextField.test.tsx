import React from 'react'
import { render } from '../../test-utils'
import TextField from './TextField'
import ValidatedForm from './ValidatedForm'

describe('TextField', () => {
    it('renders correctly', () => {
        render(
            <ValidatedForm>
                <TextField id="test-textfield" />
            </ValidatedForm>
        )
    })
})
