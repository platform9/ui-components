import React from 'react'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import ModalForm from './ModalForm'

jest.mock('./Modal', () => {
    return {
        __esModule: true,
        default: ({ open, footer, children }: any) => (open ? (
            <div>
                <div>{children}</div>
                <div>{footer}</div>
            </div>
        ) : null),
    }
})

jest.mock('../../components/validatedForm/ValidatedForm', () => {
    return {
        __esModule: true,
        default: ({ triggerSubmit, onSubmit, children }: any) => {
            triggerSubmit(() => onSubmit())
            return <form>{children}</form>
        },
    }
})

describe('ModalForm', () => {
    it('calls onSubmit when clicking Submit', async () => {
        const onSubmit = jest.fn()
        render(
            <ModalForm open onClose={jest.fn()} onSubmit={onSubmit} title="T">
                <div>Fields</div>
            </ModalForm>,
        )

        await userEvent.click(screen.getByText('Submit'))
        expect(onSubmit).toHaveBeenCalledTimes(1)
    })
})
