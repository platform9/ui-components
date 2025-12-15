import React from 'react'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import Tooltip from './Tooltip'

describe('Tooltip', () => {
    it('shows the tooltip message on hover', async () => {
        render(
            <Tooltip message="Hello">
                <span>Target</span>
            </Tooltip>,
        )

        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

        // Our Tooltip wraps children in a div.tooltip-container; hover that wrapper.
        await userEvent.hover(screen.getByText('Target').closest('.tooltip-container') as Element)

        // MUI Tooltip uses role="tooltip" and renders the title content inside.
        expect(await screen.findByRole('tooltip')).toHaveTextContent('Hello')
    })
})
