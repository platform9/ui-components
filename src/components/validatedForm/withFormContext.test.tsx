import React from 'react'
import { render } from '../../test-utils'
import withFormContext from './withFormContext'
import ValidatedForm from './ValidatedForm'

describe('withFormContext', () => {
    it('renders correctly', () => {
        // Create a simple component wrapped with withFormContext
        const SimpleInput = ({ value, onChange, ...props }: any) => (
            <input value={value || ''} onChange={(e) => onChange?.(e.target.value)} {...props} />
        )
        const WrappedInput = withFormContext(SimpleInput)

        render(
            <ValidatedForm>
                <WrappedInput id="test-input" />
            </ValidatedForm>
        )
    })
})
