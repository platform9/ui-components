import React from 'react'
import { render, screen } from '../../test-utils'
import { TabContext, withTabContext } from './TabContext'

describe('TabContext', () => {
    it('injects activeTab and addTab into wrapped component', () => {
        const addTab = jest.fn()

        const TestComponent = ({ activeTab, addTab: injectedAddTab }: any) => (
            <div>
                <div>{activeTab}</div>
                <button onClick={() => injectedAddTab({ value: 'x', label: 'X' })}>add</button>
            </div>
        )
        const WrappedComponent = withTabContext(TestComponent)

        render(
            <TabContext.Provider value={{ activeTab: 'test', addTab }}>
                <WrappedComponent />
            </TabContext.Provider>
        )

        expect(screen.getByText('test')).toBeInTheDocument()
        screen.getByText('add').click()
        expect(addTab).toHaveBeenCalledWith({ value: 'x', label: 'X' })
    })
})
