import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import withTooltip from './withTooltip'

describe('withTooltip', () => {
    it('renders wrapped content and shows tooltip message on hover', async () => {
        const SimpleComponent = ({ children }: { children?: React.ReactNode }) => (
            <div>{children}</div>
        )
        const WrappedComponent = withTooltip(SimpleComponent)

        render(<WrappedComponent tooltip="Test tooltip">Content</WrappedComponent>)

        expect(screen.getByText('Content')).toBeInTheDocument()
        const container = document.querySelector('.tooltip-container') as HTMLElement | null
        expect(container).not.toBeNull()

        fireEvent.mouseOver(container as HTMLElement)
        expect(await screen.findByText('Test tooltip')).toBeInTheDocument()
    })
})
