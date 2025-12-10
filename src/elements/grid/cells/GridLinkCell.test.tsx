import React from 'react'
import { render } from '../../../test-utils'
import GridLinkCell from './GridLinkCell'

describe('GridLinkCell', () => {
    it('renders correctly', () => {
        render(
            <GridLinkCell item={{}} routeToFn={() => ''}>
                Test link
            </GridLinkCell>
        )
    })
})
