import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import TextField from './TextField'
import ValidatedForm from './ValidatedForm'

describe('TextField', () => {
    it('formats required label and converts number input before calling onChange', () => {
        const onChange = jest.fn()
        render(
            <ValidatedForm>
                <TextField id="test-textfield" label="Count" required type="number" onChange={onChange} />
            </ValidatedForm>
        )

        expect(screen.getByText('Count *')).toBeInTheDocument()

        const input = screen.getByPlaceholderText('Count *')
        fireEvent.change(input, { target: { value: '12' } })
        expect(onChange).toHaveBeenCalledWith(12)
    })
})
