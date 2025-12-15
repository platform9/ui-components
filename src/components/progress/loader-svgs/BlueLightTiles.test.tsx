import React from 'react'
import { render } from '../../../test-utils'
import BlueLightTiles from './BlueLightTiles'

describe('BlueLightTiles', () => {
    it('sets svg dimensions based on height', () => {
        const { container } = render(<BlueLightTiles height={51} />)
        const svg = container.querySelector('svg')
        expect(svg).not.toBeNull()
        expect(svg).toHaveAttribute('height', '51')
        expect(svg).toHaveAttribute('width', '123')
    })
})
