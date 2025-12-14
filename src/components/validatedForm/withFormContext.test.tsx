import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import withFormContext from './withFormContext'
import ValidatedForm from './ValidatedForm'

describe('withFormContext', () => {
    it('propagates value changes through ValidatedForm context', () => {
        // Create a simple component wrapped with withFormContext
        const SimpleInput = ({ value, onChange, ...props }: any) => (
            <input
                aria-label="simple-input"
                value={value || ''}
                onChange={(e) => onChange?.(e.target.value)}
                {...props}
            />
        )
        const WrappedInput = withFormContext(SimpleInput)

        render(
            <ValidatedForm elevated={false}>
                <WrappedInput id="test-input" />
            </ValidatedForm>
        )

        fireEvent.change(screen.getByLabelText('simple-input'), { target: { value: 'abc' } })
        expect((screen.getByLabelText('simple-input') as HTMLInputElement).value).toBe('abc')
    })
})
