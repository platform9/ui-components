import React from 'react'
import { render, screen } from '../../test-utils'
import Progress from './Progress'

describe('Progress', () => {
    it('renders loading status and marks content as loading', () => {
        render(
            <Progress loading message="Please wait">
                <div>Loaded Content</div>
            </Progress>,
        )

        expect(screen.getByText('Please wait')).toBeInTheDocument()
        expect(screen.getByText('Loaded Content')).toBeInTheDocument()

        const content = screen.getByText('Loaded Content').closest('.progressContent')
        expect(content).not.toBeNull()
        expect(content).toHaveClass('loading')
    })
})
