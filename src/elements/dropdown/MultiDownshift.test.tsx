import React from 'react'
import { fireEvent, render, screen, waitFor } from '../../test-utils'
import MultiDownshift from './MultiDownshift'

describe('MultiDownshift', () => {
    it('calls onMultiChange when an item is selected', () => {
        const onMultiChange = jest.fn()
        const itemA = { id: 'a', label: 'A' }
        render(
            <MultiDownshift
                onMultiChange={onMultiChange}
                itemToString={(item: any) => item?.label || ''}
            >
                {({ toggleItem }) => (
                    <button type="button" onClick={() => toggleItem(itemA)}>
                        Select A
                    </button>
                )}
            </MultiDownshift>
        )

        fireEvent.click(screen.getByText('Select A'))
        return waitFor(() => {
            expect(
                onMultiChange.mock.calls.some(([items]) =>
                    Array.isArray(items) && items.some((item: any) => item?.id === 'a'),
                ),
            ).toBe(true)
        })
    })
})
