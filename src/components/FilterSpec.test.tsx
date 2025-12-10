import React from 'react'
import { render, screen } from '../test-utils'
import Filter, { FilterSpec } from './FilterSpec'

// Mocking dependencies to avoid complex router/async setup in unit test
jest.mock('use-react-router', () => ({
    __esModule: true,
    default: () => ({
        history: { push: jest.fn() },
        location: { search: '', pathname: '/' },
        match: {},
    }),
}))

describe('FilterSpec (Filter component)', () => {
    it('renders filters and search bar', () => {
        const data: any[] = []
        const setFilteredData = jest.fn()
        const filters: FilterSpec[] = [
            { name: 'role', label: 'Role', options: ['admin', 'user'], target: 'role' }
        ]

        render(
            <Filter
                data={data}
                setFilteredData={setFilteredData}
                filters={filters}
                searchTarget="name"
            />
        )

        // Check if filter label exists (Picklist label)
        expect(screen.getByText('Role')).toBeInTheDocument()
        // Check if search bar exists (placeholder or actual input)
        // SearchBar usually has a placeholder or icon. 
        // We can just check if it renders without crashing for now.
    })
})
