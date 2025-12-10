import React from 'react'
import { render, screen } from '../test-utils'
import PresetField from './PresetField'

describe('PresetField', () => {
    it('renders label and value', () => {
        render(<PresetField label="My Label" value="My Value" />)
        expect(screen.getByText('My Label')).toBeInTheDocument()
        expect(screen.getByText('My Value')).toBeInTheDocument()
    })
})
