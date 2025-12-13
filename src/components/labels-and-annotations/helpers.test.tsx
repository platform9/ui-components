import React from 'react'
import { render, screen } from '../../test-utils'
import { renderLabelsAsBadges } from './helpers'

describe('helpers', () => {
    it('renderLabelsAsBadges renders defaultValue when labels are missing', () => {
        const renderFn = renderLabelsAsBadges({ defaultValue: 'N/A' } as any)
        render(renderFn(undefined as any) as any)

        expect(screen.getByText('N/A')).toBeInTheDocument()
    })

    it('renderLabelsAsBadges renders each label as a badge', () => {
        const renderFn = renderLabelsAsBadges({} as any)
        render(renderFn(['a', 'b']) as any)

        expect(screen.getByText('a')).toBeInTheDocument()
        expect(screen.getByText('b')).toBeInTheDocument()
    })
})
