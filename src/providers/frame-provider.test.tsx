import React from 'react'
import { render, screen } from '../test-utils'
import FrameContext from './frame-provider'

describe('FrameContext', () => {
    it('provides default values and allows overriding via provider', () => {
        const TestComponent = () => {
            const context = React.useContext(FrameContext)
            return (
                <div>
                    <div>{context.sidebarPaneContainer ? 'has-sidebar' : 'no-sidebar'}</div>
                    <div>{typeof context.setFrameContainerRef}</div>
                </div>
            )
        }

        render(<TestComponent />)
        expect(screen.getByText('no-sidebar')).toBeInTheDocument()
        expect(screen.getByText('function')).toBeInTheDocument()

        render(
            <FrameContext.Provider
                value={{
                    setFrameContainerRef: () => { },
                    sidebarPaneContainer: {},
                    headerTitleContainer: null,
                    headerPrimaryActionContainer: null,
                    headerSharedToolsContainer: null,
                    contentMainContainer: null,
                } as any}
            >
                <TestComponent />
            </FrameContext.Provider>
        )

        expect(screen.getByText('has-sidebar')).toBeInTheDocument()
    })
})
