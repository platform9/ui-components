import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import ToggleSwitchField from './ToggleSwitchField'
import ValidatedForm from './ValidatedForm'

describe('ToggleSwitchField', () => {
    it('invokes onChange when toggled', () => {
        const onChange = jest.fn()
        render(
            <ValidatedForm>
                <ToggleSwitchField id="test-toggle" label="Enabled" onChange={onChange} />
            </ValidatedForm>
        )

        fireEvent.click(screen.getByTestId('enabled-toggle'))
        expect(onChange).toHaveBeenCalledWith(true)
    })
})
