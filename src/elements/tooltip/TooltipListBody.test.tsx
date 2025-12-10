import React from 'react'
import { render } from '../../test-utils'
import TooltipListBody from './TooltipListBody'

describe('TooltipListBody', () => {
    it('renders correctly', () => {
        render(<TooltipListBody items={[]} />)
    })
})
