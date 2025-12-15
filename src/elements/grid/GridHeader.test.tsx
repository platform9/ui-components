import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import GridHeader from './GridHeader'

describe('GridHeader', () => {
    it('renders column labels and calls toggleSort when a header is clicked', () => {
        const toggleSort = jest.fn()
        render(
            <table>
                <GridHeader
                    columns={[{ key: 'name', label: 'Name', width: 'small' }] as any}
                    pageRows={[] as any}
                    rowMenuItemsLength={0}
                    toggleSelectAll={() => { }}
                    selectionStatus="none"
                    multiSelectionEnabled={false}
                    rowsSelectionDisabled={true}
                    sortingDisabled={false}
                    toggleSort={toggleSort}
                    columnTogglers={[]}
                />
            </table>
        )

        fireEvent.click(screen.getByText('Name'))
        expect(toggleSort).toHaveBeenCalledWith('name')
    })
})
