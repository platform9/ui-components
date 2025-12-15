import React from 'react'
import { render, screen } from '../../../test-utils'
import GridStatusCell from './GridStatusCell'

describe('GridStatusCell', () => {
    it('renders the label computed by dataFn', () => {
        render(
            <GridStatusCell
                value="active"
                dataFn={() => ({ variant: 'success', label: 'Active' })}
            />,
        )

        expect(screen.getByText('Active')).toBeInTheDocument()
    })
})
