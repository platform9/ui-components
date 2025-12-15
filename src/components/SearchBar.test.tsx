import React from 'react'
import { render, fireEvent, screen } from '../test-utils'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
    it('renders search input', () => {
        render(<SearchBar searchTerm="" onSearchChange={() => { }} />)
        // Looking for placeholder
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
    })

    it('calls onSearchChange when typing', () => {
        const handleChange = jest.fn()
        render(<SearchBar searchTerm="" onSearchChange={handleChange} />)

        const input = screen.getByPlaceholderText('Search')
        fireEvent.change(input, { target: { value: 'query' } })

        expect(handleChange).toHaveBeenCalledWith('query')
    })
})
