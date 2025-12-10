import React from 'react'
import { render, fireEvent, screen } from '../test-utils'
import Avatar from './Avatar'

describe('Avatar', () => {
    it('renders first character of display name', () => {
        render(<Avatar displayName="John Doe" />)
        expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn()
        const { container } = render(<Avatar displayName="User" onClick={handleClick} />)
        // Avatar renders a Div (via Text component)
        // We can click the element containing 'U'
        fireEvent.click(screen.getByText('U'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})
