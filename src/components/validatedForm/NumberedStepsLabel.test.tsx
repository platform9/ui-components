import React from 'react'
import { render, screen } from '../../test-utils'
import NumberedStepsLabel from './NumberedStepsLabel'

describe('NumberedStepsLabel', () => {
    it('renders the step number and title', () => {
        const { container } = render(<NumberedStepsLabel step={3} title="Configure" />)
        expect(screen.getByText('3')).toBeInTheDocument()
        expect(screen.getByText('Configure')).toBeInTheDocument()
        expect(container.querySelector('.circle')).not.toBeNull()
        expect(container.querySelector('.title')).not.toBeNull()
    })
})
