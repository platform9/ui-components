import React from 'react'
import { render, screen } from '../../../test-utils'
import userEvent from '@testing-library/user-event'
import GridDefaultDeleteButton from './GridDefaultDeleteButton'

describe('GridDefaultDeleteButton', () => {
    it('renders with default label and calls onClick when clicked', async () => {
        const onClick = jest.fn()

        render(React.createElement(GridDefaultDeleteButton as any, { onClick }))

        await userEvent.click(screen.getByRole('button', { name: 'Delete' }))
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
