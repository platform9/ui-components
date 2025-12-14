import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import RadioFields from './radio-fields'
import ValidatedForm from './ValidatedForm'

describe('RadioFields', () => {
    it('renders options and calls onChange when an option is selected', () => {
        const onChange = jest.fn()
        render(
            <ValidatedForm>
                <RadioFields
                    id="test-radio"
                    title="Pick one"
                    options={[
                        { label: 'Option A', value: 'a' },
                        { label: 'Option B', value: 'b' },
                    ]}
                    value="a"
                    onChange={onChange}
                />
            </ValidatedForm>
        )

        expect(screen.getByText('Pick one')).toBeInTheDocument()
        expect(screen.getByText('Option A')).toBeInTheDocument()
        expect(screen.getByText('Option B')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Option B'))
        expect(onChange).toHaveBeenCalledWith('b')
    })
})
