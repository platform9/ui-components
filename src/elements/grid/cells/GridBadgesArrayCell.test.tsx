import React from 'react'
import { render, screen } from '../../../test-utils'
import GridBadgesArrayCell from './GridBadgesArrayCell'

describe('GridBadgesArrayCell', () => {
    it('renders up to maxItems and shows a +N badge when there are more items', () => {
        render(
            <GridBadgesArrayCell
                value={['one', 'two', 'three', 'four'] as any}
                maxItems={2}
                badgeVariant="default"
            />,
        )

        expect(screen.getByText('one')).toBeInTheDocument()
        expect(screen.getByText('two')).toBeInTheDocument()
        expect(screen.queryByText('three')).not.toBeInTheDocument()
        expect(screen.getByText('+2')).toBeInTheDocument()
    })
})
