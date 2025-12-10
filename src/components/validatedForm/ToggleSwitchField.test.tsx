import React from 'react'
import { render } from '../../test-utils'
import ToggleSwitchField from './ToggleSwitchField'
import ValidatedForm from './ValidatedForm'

describe('ToggleSwitchField', () => {
    it('renders correctly', () => {
        render(
            <ValidatedForm>
                <ToggleSwitchField id="test-toggle" />
            </ValidatedForm>
        )
    })
})
