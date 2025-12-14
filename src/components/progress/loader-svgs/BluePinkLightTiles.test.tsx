import React from 'react'
import { render } from '../../../test-utils'
import BluePinkLightTiles from './BluePinkLightTiles'

describe('BluePinkLightTiles', () => {
    it('sets svg dimensions based on height', () => {
        const { container } = render(<BluePinkLightTiles height={51} />)
        const svg = container.querySelector('svg')
        expect(svg).not.toBeNull()
        expect(svg).toHaveAttribute('height', '51')
        expect(svg).toHaveAttribute('width', '123')
    })
})
