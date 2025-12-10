import React from 'react'
import { render } from '../../test-utils'
import GridToolbar from './GridToolbar'

describe('GridToolbar', () => {
    it('renders correctly', () => {
        render(
            <GridToolbar
                columns={[]}
                columnTogglers={[]}
                globalFilters={[]}
                filters={[]}
            />
        )
    })
})
