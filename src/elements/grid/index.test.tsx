import React from 'react'
import { render } from '../../test-utils'
import Grid from './index'

describe('Grid (index)', () => {
    it('renders correctly', () => {
        render(
            <Grid
                columns={[]}
                data={[]}
                uniqueIdentifier="id"
            />
        )
    })
})
