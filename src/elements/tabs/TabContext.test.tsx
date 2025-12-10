import React from 'react'
import { render } from '../../test-utils'
import { TabContext, withTabContext } from './TabContext'

describe('TabContext', () => {
    it('renders correctly with provider', () => {
        const TestComponent = () => <div>Test</div>
        const WrappedComponent = withTabContext(TestComponent)

        render(
            <TabContext.Provider value={{ activeTab: 'test', addTab: () => { } }}>
                <WrappedComponent />
            </TabContext.Provider>
        )
    })
})
