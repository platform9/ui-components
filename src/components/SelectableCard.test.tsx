import React from 'react'
import { render, fireEvent, screen } from '../test-utils'
import SelectableCard from './SelectableCard'

describe('SelectableCard', () => {
    it('renders children', () => {
        render(
            <SelectableCard id="card-1" onClick={() => { }}>
                <div>Card Content</div>
            </SelectableCard>
        )
        expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('triggers onClick with id', () => {
        const handleClick = jest.fn()
        render(
            <SelectableCard id="card-1" onClick={handleClick}>
                <div>Card Content</div>
            </SelectableCard>
        )

        // SelectableCard wraps Card which wraps children. 
        // The outermost div has onClick.
        fireEvent.click(screen.getByText('Card Content'))

        expect(handleClick).toHaveBeenCalledWith('card-1')
    })

    it('shows checkmark when active and showCheckmarkIcon is true', () => {
        const { container } = render(
            <SelectableCard id="card-1" onClick={() => { }} active={true} showCheckmarkIcon={true}>
                <div>Card Content</div>
            </SelectableCard>
        )
        // Looking for the check icon (FontAwesome 'check')
        expect(container.querySelector('.fa-check')).toBeInTheDocument()
    })
})
