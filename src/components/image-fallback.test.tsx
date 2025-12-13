import React from 'react'
import { fireEvent, render } from '../test-utils'
import ImageFallback from './image-fallback'

describe('image-fallback', () => {
    it('renders src and falls back to fallbackSrc on error', () => {
        const { container, rerender } = render(
            <ImageFallback src="/img.png" fallbackSrc="/fallback.png" alt="x" />,
        )

        const img = container.querySelector('img') as HTMLImageElement
        expect(img).toBeInTheDocument()
        expect(img.getAttribute('src')).toBe('/img.png')

        fireEvent.error(img)
        expect(img.getAttribute('src')).toBe('/fallback.png')

        rerender(<ImageFallback src="/img2.png" fallbackSrc="/fallback.png" alt="x" />)
        expect(img.getAttribute('src')).toBe('/img2.png')
    })
})
