import React from 'react'
import { render } from '../../../test-utils'
import Ellipsis from './Ellipsis'

describe('Ellipsis', () => {
    it('renders animated ellipsis svg with expected attributes', () => {
        const { container } = render(<Ellipsis />)
        const svg = container.querySelector('svg')
        expect(svg).not.toBeNull()
        expect(svg).toHaveClass('loading-ellipsis-animation')
        expect(svg).toHaveAttribute('width', '29px')
        expect(svg).toHaveAttribute('height', '29px')
    })
})
