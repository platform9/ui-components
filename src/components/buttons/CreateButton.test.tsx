import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import CreateButton from './CreateButton'

describe('CreateButton', () => {
    it('generates a data-testid from children and calls onClick when clicked', () => {
        const onClick = jest.fn()
        render(<CreateButton onClick={onClick}>Create</CreateButton>)

        // CreateButton forwards children as label, so this is a normal button.
        const button = screen.getByRole('button', { name: 'Create' })
        expect(button).toHaveAttribute('data-testid', 'create')

        fireEvent.click(button)
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
