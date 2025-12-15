import React from 'react'
import { render, screen } from '../../test-utils'
import CircleStepIcon from './CircleStepIcon'

describe('CircleStepIcon', () => {
    it('renders step number by default and renders icon when provided', () => {
        const { container, rerender } = render(<CircleStepIcon stepNumber={1} />)
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(container.querySelector('i.icon')).toBeNull()

        rerender(<CircleStepIcon stepNumber={1} icon="check" />)
        expect(screen.queryByText('1')).not.toBeInTheDocument()
        const icon = container.querySelector('i.icon')
        expect(icon).not.toBeNull()
        expect(icon).toHaveClass('fa-check')
    })
})
