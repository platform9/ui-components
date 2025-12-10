import React from 'react'
import { render, screen } from '../test-utils'
import InfoTooltip from './InfoTooltip'

describe('InfoTooltip', () => {
    it('renders children', () => {
        render(
            <InfoTooltip info="Tooltip Info" align="center" offset={10}>
                <button>Hover me</button>
            </InfoTooltip>
        )
        expect(screen.getByText('Hover me')).toBeInTheDocument()
    })

    // Tooltip interaction testing usually requires hovering and awaiting async appearance.
    // Basic rendering test is sufficient for now.
})
