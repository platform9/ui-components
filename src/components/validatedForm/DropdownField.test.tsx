import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import DropdownField from './DropdownField'
import ValidatedForm from './ValidatedForm'

// Simple mock dropdown component for testing
const MockDropdown = ({ label, value = '', onChange }: any) => (
    <div>
        <span>{label}</span>
        <select value={value} onChange={(e) => onChange?.(e.target.value)}>
            <option value="">Select</option>
            <option value="a">A</option>
        </select>
    </div>
)

describe('DropdownField', () => {
    it('adds required asterisk to label and propagates value on change', () => {
        const onChange = jest.fn()
        render(
            <ValidatedForm>
                <DropdownField
                    id="test-dropdown"
                    label="Type"
                    required
                    onChange={onChange}
                    DropdownComponent={MockDropdown}
                />
            </ValidatedForm>
        )

        expect(screen.getByText('Type *')).toBeInTheDocument()

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'a' } })
        expect(onChange).toHaveBeenCalledWith('a')
    })
})
