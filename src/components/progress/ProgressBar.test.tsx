import React from 'react'
import { render, screen } from '../../test-utils'
import ProgressBar from './ProgressBar'

describe('ProgressBar', () => {
    it('renders and hides percent label based on showPercent', () => {
        const { rerender } = render(<ProgressBar percent={42} />)
        expect(screen.getByText('42%')).toBeInTheDocument()

        rerender(<ProgressBar percent={42} showPercent={false} />)
        expect(screen.queryByText('42%')).not.toBeInTheDocument()
    })
})
