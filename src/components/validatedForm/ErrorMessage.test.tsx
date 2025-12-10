import React from 'react'
import { render } from '../../test-utils'
import { ErrorMessage } from './ErrorMessage'

describe('ErrorMessage', () => {
    it('renders correctly', () => {
        render(<ErrorMessage>Test error message</ErrorMessage>)
    })
})
