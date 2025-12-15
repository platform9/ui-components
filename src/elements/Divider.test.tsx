import React from 'react'
import { render } from '../test-utils'
import Divider from './Divider'

describe('Divider', () => {
    it('renders correctly', () => {
        const { container } = render(<Divider />)
        const hr = container.querySelector('hr')
        expect(hr).toBeInTheDocument()
    })

    it('accepts custom className', () => {
        const { container } = render(<Divider className="custom-class" />)
        const hr = container.querySelector('hr')
        expect(hr).toHaveClass('custom-class')
    })
})
