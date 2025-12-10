import React from 'react'
import { render } from '../../test-utils'
import DropdownField from './DropdownField'
import ValidatedForm from './ValidatedForm'

// Simple mock dropdown component for testing
const MockDropdown = (props: any) => <select {...props} />

describe('DropdownField', () => {
    it('renders correctly', () => {
        render(
            <ValidatedForm>
                <DropdownField id="test-dropdown" DropdownComponent={MockDropdown} />
            </ValidatedForm>
        )
    })
})
