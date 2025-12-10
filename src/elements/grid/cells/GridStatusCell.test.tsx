import React from 'react'
import { render } from '../../../test-utils'
import GridStatusCell from './GridStatusCell'

describe('GridStatusCell', () => {
    it('renders correctly', () => {
        render(
            <GridStatusCell
                value="active"
                dataFn={() => ({ variant: 'success', label: 'Active' })}
            />
        )
    })
})
