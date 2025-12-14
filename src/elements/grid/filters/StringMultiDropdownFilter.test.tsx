import React from 'react'
import { render } from '../../../test-utils'
import StringMultiDropdownFilter from './StringMultiDropdownFilter'

jest.mock('../../dropdown/MultiDropdown', () => {
    return {
        __esModule: true,
        default: (props: any) => {
            ;(global as any).__multiDropdownProps = props
            return <div data-testid="multi-dropdown" />
        },
    }
})

describe('StringMultiDropdownFilter', () => {
    it('filters out values not present in dropdownOptions before passing to MultiDropdown', () => {
        const onChange = jest.fn()
        render(
            <StringMultiDropdownFilter
                dropdownOptions={[{ label: 'Active', value: 'active' }]}
                value={['active', 'inactive']}
                onChange={onChange}
            />,
        )

        const props = (global as any).__multiDropdownProps
        expect(props).toBeTruthy()
        expect(props.items).toEqual([{ label: 'Active', value: 'active' }])
        expect(props.value).toEqual(['active'])
        expect(props.bottomContent).toBeTruthy()
    })
})
