import React from 'react'
import { render } from '../../test-utils'
import ControlledGrid from './ControlledGrid'

describe('ControlledGrid', () => {
    it('renders correctly', () => {
        render(
            <ControlledGrid
                columns={[]}
                data={[]}
                selectedItems={[]}
                onSelectChange={() => { }}
                uniqueIdentifier="id"
            />
        )
    })
})
