import React from 'react'
import { render, fireEvent, screen, waitFor } from '../test-utils'
import MultiSelect from './MultiSelect'

describe('MultiSelect', () => {
    const options = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
    ]

    it('renders options', () => {
        render(<MultiSelect id="test-select" options={options} onChange={() => { }} />)
        expect(screen.getByText('Apple')).toBeInTheDocument()
        expect(screen.getByText('Banana')).toBeInTheDocument()
    })

    it('calls onChange when option clicked', () => {
        const handleChange = jest.fn()
        render(<MultiSelect id="test-select" options={options} onChange={handleChange} />)

        fireEvent.click(screen.getByText('Apple'))

        // Should call with array of selected values
        expect(handleChange).toHaveBeenCalledWith(['apple'])
    })

    it('filters options when searching', async () => {
        const { getByRole, queryByText } = render(<MultiSelect id="test-select" options={options} onChange={() => { }} />)
        const searchInput = getByRole('textbox')

        fireEvent.change(searchInput, { target: { value: 'Apple' } })

        await screen.findByText('Apple')
        await waitFor(() => {
            expect(queryByText('Banana')).not.toBeInTheDocument()
        })
    })
})
