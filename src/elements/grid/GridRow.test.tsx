import React from 'react'
import { render } from '../../test-utils'
import GridRow from './GridRow'

describe('GridRow', () => {
    it('renders correctly', () => {
        render(
            <table>
                <tbody>
                    <GridRow
                        item={{}}
                        getCells={() => []}
                        className=""
                        tdClassName=""
                        cellClassName=""
                        isSelectable={false}
                        isSelected={false}
                        multiSelection={false}
                        toggleSelect={() => { }}
                        expandedRowsById={{}}
                    />
                </tbody>
            </table>
        )
    })
})
