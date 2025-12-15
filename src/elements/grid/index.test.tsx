import React from 'react'
import { render, screen } from '../../test-utils'
import Grid from './index'

describe('Grid (index)', () => {
    it('shows the default empty state when there is no data', () => {
        render(
            <Grid
                columns={[]}
                data={[]}
                uniqueIdentifier="id"
            />
        )

        expect(screen.getByText('No data found')).toBeInTheDocument()
    })
})
