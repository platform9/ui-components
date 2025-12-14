import React from 'react'
import { render, screen } from '../../test-utils'
import DonutWidget from './DonutWidget'

describe('DonutWidget', () => {
    it('renders a legend with formatted names and values', () => {
        render(
            <DonutWidget
                data={[
                    { name: 'used_space', value: 2, color: 'primary' },
                    { name: 'free_space', value: 3, color: 'success' },
                ]}
            />,
        )

        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('Used Space')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
        expect(screen.getByText('Free Space')).toBeInTheDocument()
    })
})
