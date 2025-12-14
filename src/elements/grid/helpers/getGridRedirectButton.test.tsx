import React from 'react'
import { render, screen } from '../../../test-utils'
import userEvent from '@testing-library/user-event'
import getGridRedirectButton from './getGridRedirectButton'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { GridContext } from '../Grid'

describe('getGridRedirectButton', () => {
    it('redirects to computed route using the first selected item', async () => {
        const history = createMemoryHistory({ initialEntries: ['/'] })
        const RedirectButton = getGridRedirectButton<{ id: string }>((item) => `/details/${item.id}`)

        render(
            <Router history={history as any}>
                <GridContext.Provider value={{ selectedItems: [{ id: '123' }] }}>
                    <RedirectButton onClick={jest.fn()}>Go</RedirectButton>
                </GridContext.Provider>
            </Router>,
        )

        await userEvent.click(screen.getByText('Go'))
        expect(history.location.pathname).toBe('/details/123')
    })
})
