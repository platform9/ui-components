import React from 'react'
import { render } from '../../test-utils'
import withProgress from './withProgress'

describe('withProgress', () => {
    it('renders correctly', () => {
        const TestComponent = () => <div>Test Content</div>
        const WrappedComponent = withProgress(TestComponent)
        render(<WrappedComponent />)
    })
})
