import React from 'react'
import { render, screen } from '../test-utils'
import DisplayKeyValues from './DisplayKeyValues'

describe('DisplayKeyValues', () => {
    it('renders key value pairs', () => {
        const data = [
            { key: 'Name', value: 'John' },
            { key: 'Role', value: 'Admin' },
        ]
        render(<DisplayKeyValues keyValuePairs={data} />)

        expect(screen.getByText('Name:')).toBeInTheDocument()
        expect(screen.getByText('John')).toBeInTheDocument()
        expect(screen.getByText('Role:')).toBeInTheDocument()
        expect(screen.getByText('Admin')).toBeInTheDocument()
    })

    it('renders with custom renderer', () => {
        const data = [
            { key: 'Status', value: 'Active', render: (val: any) => <span>Custom {val}</span> }
        ]
        render(<DisplayKeyValues keyValuePairs={data} />)
        expect(screen.getByText('Custom Active')).toBeInTheDocument()
    })
})
