import React from 'react'
import { render } from '../../test-utils'
import DropdownInput from './DropdownInput'

describe('DropdownInput', () => {
    it('renders search icon and input element', () => {
        const { container } = render(<DropdownInput />)
        expect(container.querySelector('i.fa-magnifying-glass')).not.toBeNull()
        expect(container.querySelector('input')).not.toBeNull()
    })
})
