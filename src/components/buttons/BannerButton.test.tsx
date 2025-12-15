import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import BannerButton from './BannerButton'

describe('BannerButton', () => {
    it('invokes onClick when pressed', () => {
        const onClick = jest.fn()
        render(<BannerButton onClick={onClick}>Banner Action</BannerButton>)

        fireEvent.click(screen.getByRole('button', { name: 'Banner Action' }))
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
