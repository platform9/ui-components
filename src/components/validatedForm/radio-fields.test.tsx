import React from 'react'
import { render } from '../../test-utils'
import RadioFields from './radio-fields'
import ValidatedForm from './ValidatedForm'

describe('RadioFields', () => {
    it('renders correctly', () => {
        render(
            <ValidatedForm>
                <RadioFields id="test-radio" options={[]} value="" onChange={() => { }} />
            </ValidatedForm>
        )
    })
})
