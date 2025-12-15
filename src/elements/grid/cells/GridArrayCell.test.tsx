import React from 'react'
import { render, screen } from '../../../test-utils'
import GridArrayCell from './GridArrayCell'

describe('GridArrayCell', () => {
    it('renders names for each item using nameFn', () => {
        render(
            <GridArrayCell
                // Grid cells receive value/item from the grid; for unit testing we only need value + nameFn
                value={[{ id: 'a' }, { id: 'b' }] as any}
                nameFn={(item: any) => item.id}
            />,
        )

        expect(screen.getByText('a')).toBeInTheDocument()
        expect(screen.getByText('b')).toBeInTheDocument()
    })
})
