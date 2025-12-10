import React from 'react'
import { render, fireEvent } from '../test-utils'
import KeyValues, { EntryShape } from './KeyValues'

// Mock uuid
jest.mock('uuid', () => ({
    v4: () => 'mock-id-' + Math.random()
}))

describe('KeyValues', () => {
    it('renders initial empty entry', () => {
        const { getAllByPlaceholderText } = render(<KeyValues onChange={() => { }} entries={[]} />)
        // Should have Key and Value inputs
        expect(getAllByPlaceholderText('Key')).toHaveLength(1)
        expect(getAllByPlaceholderText('Value')).toHaveLength(1)
    })

    it('renders provided entries', () => {
        const entries: EntryShape[] = [
            { key: 'k1', value: 'v1' }
        ]
        const { getByDisplayValue } = render(<KeyValues onChange={() => { }} entries={entries} />)
        expect(getByDisplayValue('k1')).toBeInTheDocument()
        expect(getByDisplayValue('v1')).toBeInTheDocument()
    })
})
