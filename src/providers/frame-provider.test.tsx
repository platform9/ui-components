import React from 'react'
import { render } from '../test-utils'
import FrameContext from './frame-provider'

describe('FrameContext', () => {
    it('renders correctly with provider', () => {
        const TestComponent = () => {
            const context = React.useContext(FrameContext)
            return <div>{context.sidebarPaneContainer ? 'yes' : 'no'}</div>
        }

        render(
            <FrameContext.Provider
                value={{
                    setFrameContainerRef: () => { },
                    sidebarPaneContainer: null,
                    headerTitleContainer: null,
                    headerPrimaryActionContainer: null,
                    headerSharedToolsContainer: null,
                    contentMainContainer: null,
                }}
            >
                <TestComponent />
            </FrameContext.Provider>
        )
    })
})
