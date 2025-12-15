import React from 'react'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import GridToolbar from './GridToolbar'

describe('GridToolbar', () => {
    it('calls onRefresh when clicking Refresh (when nothing is selected)', async () => {
        const onRefresh = jest.fn()

        render(
            <GridToolbar
                label="Instances"
                columns={[]}
                columnTogglers={[]}
                globalFilters={[]}
                filters={[]}
                clearFilters={jest.fn()}
                selectedCount={0}
                multiSelectionEnabled
                batchActionsDisabled={false}
                rowsSelectionDisabled={false}
                batchActions={[]}
                clearSelectedRows={jest.fn()}
                onRefresh={onRefresh}
            />,
        )

        await userEvent.click(screen.getByText('Refresh'))
        expect(onRefresh).toHaveBeenCalledTimes(1)
    })

    it('shows Clear All when rows are selected and calls clearSelectedRows', async () => {
        const clearSelectedRows = jest.fn()

        render(
            <GridToolbar
                label="Instances"
                columns={[]}
                columnTogglers={[]}
                globalFilters={[]}
                filters={[]}
                clearFilters={jest.fn()}
                selectedCount={2}
                multiSelectionEnabled
                batchActionsDisabled={false}
                rowsSelectionDisabled={false}
                batchActions={[]}
                clearSelectedRows={clearSelectedRows}
                onRefresh={jest.fn()}
            />,
        )

        expect(screen.getByText('2 Selected')).toBeInTheDocument()
        await userEvent.click(screen.getByText('Clear All'))
        expect(clearSelectedRows).toHaveBeenCalledTimes(1)
    })

    it('removes an active dropdown filter value when clicking the x icon', async () => {
        const updateFilterValue = jest.fn()
        const filterInfo = {
            key: 'status',
            label: 'Status',
            display: 'Active',
            value: 'active',
            updateFilterValue,
        }

        const { container } = render(
            <GridToolbar
                label="Instances"
                columns={[]}
                columnTogglers={[]}
                globalFilters={[]}
                filters={[]}
                clearFilters={jest.fn()}
                selectedCount={0}
                multiSelectionEnabled
                batchActionsDisabled={false}
                rowsSelectionDisabled={false}
                batchActions={[]}
                clearSelectedRows={jest.fn()}
                onRefresh={jest.fn()}
                dropdownFilters={[]}
                dropdownFilterValues={[filterInfo as any]}
                dropdownValuesByKey={{ status: ['active', 'inactive'] }}
            />,
        )

        const xIcon = container.querySelector('.fa-xmark') as HTMLElement | null
        expect(xIcon).not.toBeNull()

        await userEvent.click(xIcon as HTMLElement)
        expect(updateFilterValue).toHaveBeenCalledTimes(1)
        expect(updateFilterValue).toHaveBeenCalledWith(['inactive'])
    })
})
