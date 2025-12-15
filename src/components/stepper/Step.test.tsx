import React from 'react'
import { render, screen } from '../../test-utils'
import Step from './Step'
import CircleStepIcon from './CircleStepIcon'

describe('Step', () => {
    it('renders label/content and hides the line for the last step', () => {
        const stepIcon = <CircleStepIcon stepNumber={1} />
        const { container, rerender } = render(
            <Step label="Step One" content="Details" stepIcon={stepIcon} />,
        )

        expect(screen.getByText('Step One')).toBeInTheDocument()
        expect(screen.getByText('Details')).toBeInTheDocument()
        expect(container.querySelector('.line')).not.toBeNull()

        rerender(<Step label="Step One" content="Details" stepIcon={stepIcon} isLastStep />)
        expect(container.querySelector('.line')).toBeNull()
    })
})
