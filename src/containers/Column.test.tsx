import React from 'react'
import { render } from '../test-utils'
import Column from './Column'

describe('Column', () => {
    it('renders correctly', () => {
        render(<Column>Test content</Column>)
    })
})
