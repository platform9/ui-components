import React from 'react'
import { render, screen } from '../../test-utils'
import ReactDOM from 'react-dom'
import FrameContext from '../../providers/frame-provider'
import { HeaderTitlePortal } from './portals'

describe('portals', () => {
    it('renders children into headerTitleContainer when available', () => {
        const headerTitleContainer = document.createElement('div')
        const spy = jest.spyOn(ReactDOM, 'createPortal')

        render(
            <FrameContext.Provider
                value={{
                    setFrameContainerRef: jest.fn(),
                    sidebarPaneContainer: null,
                    headerTitleContainer: headerTitleContainer as any,
                    headerPrimaryActionContainer: null,
                    headerSharedToolsContainer: null,
                    contentMainContainer: null,
                } as any}
            >
                <HeaderTitlePortal>
                    <div>Title</div>
                </HeaderTitlePortal>
            </FrameContext.Provider>,
        )

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy.mock.calls[0][1]).toBe(headerTitleContainer)
        spy.mockRestore()
    })

    it('returns null when container is missing', () => {
        const headerTitleContainer = null

        const { container } = render(
            <FrameContext.Provider
                value={{
                    setFrameContainerRef: jest.fn(),
                    sidebarPaneContainer: null,
                    headerTitleContainer,
                    headerPrimaryActionContainer: null,
                    headerSharedToolsContainer: null,
                    contentMainContainer: null,
                } as any}
            >
                <HeaderTitlePortal>
                    <div>Title</div>
                </HeaderTitlePortal>
            </FrameContext.Provider>,
        )

        expect(screen.queryByText('Title')).toBeNull()
        expect(container).toBeTruthy()
    })
})
