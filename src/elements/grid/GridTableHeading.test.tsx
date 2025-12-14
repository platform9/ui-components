import React from 'react'
import { render, screen } from '../../test-utils'
import GridTableHeading from './GridTableHeading'

describe('GridTableHeading', () => {
    it('renders a table header cell with provided content', () => {
        render(
            <table>
                <thead>
                    <tr>
                        <GridTableHeading sortingDisabled={false} width="medium">
                            Name
                        </GridTableHeading>
                    </tr>
                </thead>
            </table>,
        )

        expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    })
})
