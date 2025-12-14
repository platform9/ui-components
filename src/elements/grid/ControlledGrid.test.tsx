import React from 'react'
import { render, screen } from '../../test-utils'
import ControlledGrid from './ControlledGrid'

describe('ControlledGrid', () => {
    it('renders empty content when there is no data', () => {
        render(
            <ControlledGrid
                columns={[] as any}
                data={[]}
                selectedItems={[]}
                onSelectChange={() => { }}
                uniqueIdentifier="id"
                emptyContent="Nothing here"
            />
        )

        expect(screen.getByTestId('no-data-found')).toHaveTextContent('Nothing here')
    })
})
