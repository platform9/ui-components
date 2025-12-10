import React from 'react'
import { render } from '../../test-utils'
import GridColumnsPopover from './GridColumnsPopover'

describe('GridColumnsPopover', () => {
    it('renders correctly', () => {
        render(<GridColumnsPopover columnTogglers={[]} columns={[]} />)
    })
})
