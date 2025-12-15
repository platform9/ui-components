import React from 'react'
import { render } from '../../test-utils'
import AsyncDropdown from './AsyncDropdown'

describe('AsyncDropdown', () => {
    it('selects first item when selectFirst=true and items are loaded', () => {
        const onChange = jest.fn()
        const items = [
            { label: 'One', value: 'one' },
            { label: 'Two', value: 'two' },
        ]

        render(
            <AsyncDropdown
                items={items as any}
                value={undefined as any}
                selectFirst
                loading={false}
                onChange={onChange}
            />,
        )

        expect(onChange).toHaveBeenCalledWith('one')
    })
})
