import React from 'react'
import { render, screen } from '../test-utils'
import DisplayLabels from './DisplayLabels'

describe('DisplayLabels', () => {
    it('renders labels from object', () => {
        const labels = {
            Env: 'Prod',
            Region: 'US-West'
        }
        render(<DisplayLabels labels={labels} />)

        expect(screen.getByText((content) => content.includes('Env: Prod'))).toBeInTheDocument()
        expect(screen.getByText((content) => content.includes('Region: US-West'))).toBeInTheDocument()
    })
})
