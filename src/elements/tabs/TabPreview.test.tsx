import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import TabPreview from './TabPreview'

describe('TabPreview', () => {
    it('calls onClick with value when clicked and shows active border when active', () => {
        const onClick = jest.fn()
        const { container, rerender } = render(
            <TabPreview label="My Tab" value="tab-1" isActive={false} onClick={onClick} />,
        )

        fireEvent.click(screen.getByText('My Tab'))
        expect(onClick).toHaveBeenCalledWith('tab-1')
        expect(container.querySelector('span')).toBeNull()

        rerender(<TabPreview label="My Tab" value="tab-1" isActive onClick={onClick} />)
        expect(container.querySelector('span')).not.toBeNull()
    })
})
