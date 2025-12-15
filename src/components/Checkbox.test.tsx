import React from 'react'
import { render, fireEvent, screen } from '../test-utils'
import Checkbox from './Checkbox'

describe('Checkbox (Component)', () => {
    it('renders correctly', () => {
        render(<Checkbox name="test-checkbox" />)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeInTheDocument()
    })

    it('handles change events', () => {
        const handleChange = jest.fn()
        render(<Checkbox name="test-checkbox" onChange={handleChange} />)
        const checkbox = screen.getByRole('checkbox')
        fireEvent.click(checkbox)
        expect(handleChange).toHaveBeenCalled()
    })
})
