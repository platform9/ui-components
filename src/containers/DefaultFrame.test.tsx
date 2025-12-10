import React from 'react'
import { render } from '../test-utils'
import DefaultFrame from './DefaultFrame'

describe('DefaultFrame', () => {
    it('renders correctly', () => {
        render(<DefaultFrame>Test content</DefaultFrame>)
    })
})
