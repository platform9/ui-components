import React from 'react'
import { render, screen } from '../../test-utils'
import withProgress from './withProgress'

describe('withProgress', () => {
    it('wraps a component in Progress and shows loading status when loading=true', () => {
        const TestComponent = () => <div>Test Content</div>
        const WrappedComponent = withProgress(TestComponent)

        render(<WrappedComponent loading />)

        expect(screen.getByText('Loading')).toBeInTheDocument()
        expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
})
