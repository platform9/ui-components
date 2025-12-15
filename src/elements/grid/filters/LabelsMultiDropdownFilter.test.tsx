import React from 'react'
import { render } from '../../../test-utils'
import LabelsMultiDropdownFilter from './LabelsMultiDropdownFilter'

jest.mock('../../dropdown/MultiDropdown', () => {
    return {
        __esModule: true,
        default: (props: any) => {
            ;(global as any).__multiDropdownProps = props
            return <div data-testid="multi-dropdown" />
        },
    }
})

describe('LabelsMultiDropdownFilter', () => {
    it('filters out values not present in the labels list before passing to MultiDropdown', () => {
        const onChange = jest.fn()
        const valid = { key: 'env', value: 'prod' }
        const invalid = { key: 'env', value: 'dev' }

        render(
            <LabelsMultiDropdownFilter
                labels={[valid]}
                value={[valid, invalid]}
                onChange={onChange}
            />,
        )

        const props = (global as any).__multiDropdownProps
        expect(props).toBeTruthy()
        expect(props.items).toEqual([{ label: 'env=prod', value: valid }])
        expect(props.value).toEqual([valid])
        expect(props.bottomContent).toBeTruthy()
    })
})
