import React from 'react'
import { render } from '../../test-utils'
import SpinLogo from './SpinLogo'

describe('SpinLogo', () => {
    it('applies different computed styles when active changes', () => {
        const { rerender } = render(<SpinLogo active={false} />)

        const logo = document.getElementById('logoDefault') as HTMLElement | null
        expect(logo).not.toBeNull()
        const activeSquares = document.getElementById('logoDefault__active-squares') as HTMLElement | null
        expect(activeSquares).not.toBeNull()

        const inactiveTransform = window.getComputedStyle(logo as HTMLElement).transform
        const inactiveOpacity = window.getComputedStyle(activeSquares as HTMLElement).opacity

        rerender(<SpinLogo active />)

        const activeTransform = window.getComputedStyle(logo as HTMLElement).transform
        const activeOpacity = window.getComputedStyle(activeSquares as HTMLElement).opacity

        expect(inactiveTransform).not.toEqual(activeTransform)
        expect(inactiveOpacity).not.toEqual(activeOpacity)
    })
})
