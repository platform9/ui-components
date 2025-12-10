import React from 'react'
import { render } from '../../test-utils'
import NavItem from './NavItem'

describe('NavItem', () => {
    it('renders correctly', () => {
        render(<NavItem name="Test Nav" link={{ path: '/test' }} />)
    })
})
