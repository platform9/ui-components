import React from 'react'
import { render } from '../../test-utils'
import withTooltip from './withTooltip'

describe('withTooltip', () => {
    it('renders correctly', () => {
        const SimpleComponent = ({ children }: { children?: React.ReactNode }) => (
            <div>{children}</div>
        )
        const WrappedComponent = withTooltip(SimpleComponent)

        render(<WrappedComponent tooltip="Test tooltip">Content</WrappedComponent>)
    })
})
