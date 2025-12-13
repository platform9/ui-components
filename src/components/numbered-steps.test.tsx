import React from 'react'
import { render, screen } from '../test-utils'
import NumberedSteps from './numbered-steps'

describe('numbered-steps', () => {
    it('renders title, step number, and description', () => {
        render(<NumberedSteps step={1} title="Step One" description="Do it" />)

        expect(screen.getByText('Step One')).toBeInTheDocument()
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('Do it')).toBeInTheDocument()
    })
})
