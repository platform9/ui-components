import React from 'react'
import { render, screen } from '../../test-utils'
import PieUsageWidget from './PieUsageWidget'

describe('PieUsageWidget', () => {
    it('renders legend values and formatted names', () => {
        render(
            <PieUsageWidget
                primary="used"
                data={[
                    { name: 'used', value: 1, color: 'primary' },
                    { name: 'free', value: 3, color: 'success' },
                ]}
            />,
        )

        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('Used')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
        expect(screen.getByText('Free')).toBeInTheDocument()
    })
})
