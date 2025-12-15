import React from 'react'
import { render, fireEvent } from '../test-utils'
import FontAwesomeIcon from './FontAwesomeIcon'

describe('FontAwesomeIcon', () => {
    it('renders correctly with name', () => {
        const { container } = render(<FontAwesomeIcon name="coffee" />)
        expect(container.querySelector('.fa-coffee')).toBeInTheDocument()
    })

    it('renders correctly with children', () => {
        const { container } = render(<FontAwesomeIcon>user</FontAwesomeIcon>)
        expect(container.querySelector('.fa-user')).toBeInTheDocument()
    })

    it('applies style classes', () => {
        // light is default
        const { container } = render(<FontAwesomeIcon solid>user</FontAwesomeIcon>)
        expect(container.querySelector('.fa-solid')).toBeInTheDocument()
    })

    it('handles click events', () => {
        const handleClick = jest.fn()
        const { container } = render(<FontAwesomeIcon onClick={handleClick}>user</FontAwesomeIcon>)
        fireEvent.click(container.querySelector('i')!)
        expect(handleClick).toHaveBeenCalled()
    })
})
