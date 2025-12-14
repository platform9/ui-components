import React from 'react'
import { render } from '../../test-utils'
import Header from './Header'
import FrameContext from '../../providers/frame-provider'

const setFrameContainerRef = jest.fn()

describe('Header', () => {
    beforeEach(() => {
        setFrameContainerRef.mockClear()
    })

    it('registers header containers in FrameContext on mount', () => {
        render(
            <FrameContext.Provider
                value={{
                    setFrameContainerRef,
                    sidebarPaneContainer: null,
                    headerTitleContainer: null,
                    headerPrimaryActionContainer: null,
                    headerSharedToolsContainer: null,
                    contentMainContainer: null,
                }}
            >
                <Header />
            </FrameContext.Provider>,
        )

        expect(setFrameContainerRef).toHaveBeenCalledTimes(1)
        const payload = setFrameContainerRef.mock.calls[0][0]
        expect(payload.headerTitleContainer).toBeInstanceOf(HTMLElement)
        expect(payload.headerPrimaryActionContainer).toBeInstanceOf(HTMLElement)
        expect(payload.headerSharedToolsContainer).toBeInstanceOf(HTMLElement)
    })
})
