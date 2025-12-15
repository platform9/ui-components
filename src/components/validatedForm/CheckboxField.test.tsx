import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import CheckboxField from './CheckboxField'
import ValidatedForm from './ValidatedForm'

describe('CheckboxField', () => {
    it('invokes onChange with updated checked state when clicked', () => {
        const onChange = jest.fn()
        render(
            <ValidatedForm>
                <CheckboxField id="test-checkbox" label="Accept" onChange={onChange} />
            </ValidatedForm>
        )

        fireEvent.click(screen.getByText('Accept'))
        expect(onChange).toHaveBeenCalledWith(true)
    })
})
