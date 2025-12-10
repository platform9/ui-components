import React from 'react'
import { render } from '../../test-utils'
import GridHeader from './GridHeader'

describe('GridHeader', () => {
    it('renders correctly', () => {
        render(
            <table>
                <GridHeader
                    columns={[]}
                    pageRows={[]}
                    rowMenuItemsLength={0}
                    toggleSelectAll={() => { }}
                    selectionStatus="none"
                    multiSelectionEnabled={false}
                    rowsSelectionDisabled={true}
                    sortingDisabled={true}
                    toggleSort={() => { }}
                    columnTogglers={[]}
                />
            </table>
        )
    })
})
