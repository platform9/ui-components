import React from 'react'
import { render } from '../../test-utils'
import MenuItem from './MenuItem'

describe('MenuItem', () => {
    it('renders correctly', () => {
        render(<MenuItem>Test Item</MenuItem>)
    })
})
