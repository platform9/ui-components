import React from 'react'
import { render, screen } from '../../../test-utils'
import userEvent from '@testing-library/user-event'
import GridDefaultActionButton from './GridDefaultActionButton'

describe('GridDefaultActionButton', () => {
    it('calls onClick when clicked', async () => {
        const onClick = jest.fn()

        render(<GridDefaultActionButton onClick={onClick}>Action</GridDefaultActionButton>)

        await userEvent.click(screen.getByRole('button', { name: 'Action' }))
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
        const onClick = jest.fn()

        render(
            <GridDefaultActionButton disabled onClick={onClick}>
                Action
            </GridDefaultActionButton>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Action' }))
        expect(onClick).not.toHaveBeenCalled()
    })
})
