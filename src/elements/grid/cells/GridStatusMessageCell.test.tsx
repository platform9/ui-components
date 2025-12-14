import React from 'react'
import { render, screen } from '../../../test-utils'
import GridStatusMessageCell from './GridStatusMessageCell'

describe('GridStatusMessageCell', () => {
    it('renders nothing when status is Running', () => {
        const { container } = render(
            <GridStatusMessageCell value={{ state: 'Running', reason: 'R', message: 'M' }} />,
        )

        expect(screen.queryByText('R')).not.toBeInTheDocument()
        expect(screen.queryByText('M')).not.toBeInTheDocument()
        expect(container.querySelector('.tooltip-container')).toBeNull()
    })

    it('renders reason and message when status is not Running', () => {
        render(
            <GridStatusMessageCell value={{ state: 'Error', reason: 'Failed', message: 'Oops' }} />,
        )

        const reason = screen.getByText('Failed')
        expect(reason).toBeInTheDocument()

        expect(screen.getByText(/oops/i)).toBeInTheDocument()
    })
})
