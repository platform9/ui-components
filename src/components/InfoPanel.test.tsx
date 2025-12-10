import React from 'react'
import { render, screen } from '../test-utils'
import InfoPanel, { IDetailFields } from './InfoPanel'

describe('InfoPanel', () => {
    it('renders title and fields', () => {
        const items = {
            'Field 1': { value: 'Value 1' },
            'Field 2': { value: 'Value 2' },
        }
        render(<InfoPanel title="Test Panel" items={items} />)

        expect(screen.getByText('Test Panel')).toBeInTheDocument()
        expect(screen.getByText('Field 1:')).toBeInTheDocument()
        expect(screen.getByText('Value 1')).toBeInTheDocument()
        expect(screen.getByText('Field 2:')).toBeInTheDocument()
        expect(screen.getByText('Value 2')).toBeInTheDocument()
    })

    it('renders custom body', () => {
        render(<InfoPanel title="Custom" customBody={<div>Custom Body</div>} />)
        expect(screen.getByText('Custom Body')).toBeInTheDocument()
    })
})
