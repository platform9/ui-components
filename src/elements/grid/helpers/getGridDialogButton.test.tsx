import React from 'react'
import { render, screen, waitFor } from '../../../test-utils'
import userEvent from '@testing-library/user-event'
import getGridDialogButton from './getGridDialogButton'
import { GridContext } from '../Grid'

const triggerRefresh = jest.fn()
const clearSelectedRows = jest.fn()

describe('getGridDialogButton', () => {
    beforeEach(() => {
        triggerRefresh.mockClear()
        clearSelectedRows.mockClear()
    })

    it('opens dialog on click and triggers refresh + clears selection on success close', async () => {
        const Dialog = ({ onClose, rows }: any) => (
            <div data-testid="dialog">
                <div>{rows?.length}</div>
                <button type="button" onClick={() => onClose(true)}>
                    Close Success
                </button>
            </div>
        )

        const DialogButton = getGridDialogButton<any, any>(Dialog)

        render(
            <GridContext.Provider
                value={{
                    triggerRefresh,
                    selectedItems: [{ id: '1' }],
                    clearSelectedRows,
                }}
            >
                <DialogButton onClick={jest.fn()}>Open</DialogButton>
            </GridContext.Provider>,
        )

        expect(screen.queryByTestId('dialog')).toBeNull()

        await userEvent.click(screen.getByText('Open'))
        expect(screen.getByTestId('dialog')).toBeInTheDocument()

        await userEvent.click(screen.getByText('Close Success'))
        expect(clearSelectedRows).toHaveBeenCalled()
        expect(triggerRefresh).toHaveBeenCalled()

        await waitFor(() => {
            expect(screen.queryByTestId('dialog')).toBeNull()
        })
    })
})
