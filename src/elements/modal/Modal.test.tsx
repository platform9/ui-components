import React from 'react'
import { render } from '../../test-utils'
import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

describe('Modal', () => {
    it('calls onClose when clicking the overlay', async () => {
        jest.useFakeTimers()
        const root = document.createElement('div')
        root.id = 'modal-portal-root'
        document.body.appendChild(root)

        const onClose = jest.fn()
        const { container } = render(
            <Modal open onClose={onClose} title="Title">
                Body
            </Modal>,
        )

        await act(async () => {
            jest.advanceTimersByTime(20)
        })

        // Modal renders via React portal into #modal-portal-root, so query there.
        const modalPage = root.firstElementChild as HTMLElement | null
        expect(modalPage).not.toBeNull()
        const overlay = (modalPage?.firstElementChild as HTMLElement | null) ?? null
        expect(overlay).not.toBeNull()

        await userEvent.click(overlay as HTMLElement)

        expect(onClose).toHaveBeenCalledTimes(1)

        document.body.removeChild(root)
        jest.useRealTimers()
    })
})
