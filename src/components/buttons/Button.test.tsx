import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import Button from './Button'

describe('Button', () => {
    it('renders the label and calls onClick when clicked', () => {
        const onClick = jest.fn()
        render(<Button label="Save" onClick={onClick} />)

        const button = screen.getByRole('button', { name: 'Save' })
        fireEvent.click(button)

        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
