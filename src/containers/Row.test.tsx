import React from 'react'
import { render } from '../test-utils'
import Row from './Row'

describe('Row', () => {
    it('renders correctly', () => {
        render(<Row>Test content</Row>)
    })
})
