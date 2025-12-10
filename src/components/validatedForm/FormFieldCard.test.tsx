import React from 'react'
import { render } from '../../test-utils'
import { FormFieldCard } from './FormFieldCard'

describe('FormFieldCard', () => {
    it('renders correctly', () => {
        render(<FormFieldCard title="Test Card">Test content</FormFieldCard>)
    })
})
