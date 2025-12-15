import React from 'react'
import { render, screen } from '../test-utils'
import Timeline from './Timeline'

describe('Timeline', () => {
    it('renders items', () => {
        const items = ['Step 1', 'Step 2', 'Step 3']
        render(<Timeline items={items} activeStep={1} />)
        expect(screen.getByText('Step 1')).toBeInTheDocument()
        expect(screen.getByText('Step 2')).toBeInTheDocument()
        expect(screen.getByText('Step 3')).toBeInTheDocument()
    })
})
