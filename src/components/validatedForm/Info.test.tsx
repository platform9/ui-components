import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import Info from './Info'

describe('Info', () => {
    it('toggles content visibility when title is provided', () => {
        const { container } = render(
            <Info title="More info" expanded={false}>
                <div>Hidden details</div>
            </Info>,
        )

        expect(screen.getByText('More info')).toBeInTheDocument()
        expect(screen.queryByText('Hidden details')).not.toBeInTheDocument()

        const toggleIcon = container.querySelector('i.fa-angle-down')
        expect(toggleIcon).not.toBeNull()
        fireEvent.click((toggleIcon as Element).parentElement as Element)

        expect(screen.getByText('Hidden details')).toBeInTheDocument()
    })
})
