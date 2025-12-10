import React from 'react'
import { render, screen, act } from '../test-utils'
import PollingData from './PollingData'

describe('PollingData', () => {
    jest.useFakeTimers()

    it('renders correctly', () => {
        render(
            <PollingData
                loading={false}
                onReload={jest.fn()}
            />
        )
        // Check if button renders (it usually shows "a few seconds ago" or similar from moment)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('shows loading state', () => {
        render(
            <PollingData
                loading={true}
                onReload={jest.fn()}
            />
        )
        expect(screen.getByText('loading...')).toBeInTheDocument()
    })
})
