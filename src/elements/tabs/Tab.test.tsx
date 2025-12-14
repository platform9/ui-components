import React from 'react'
import { render, screen } from '../../test-utils'
import { TabContext } from './TabContext'
import Tab from './Tab'

describe('Tab', () => {
    it('registers itself via addTab and renders children only when active', () => {
        const addTab = jest.fn()

        const { rerender } = render(
            <TabContext.Provider value={{ activeTab: 'a', addTab }}>
                <Tab value="a" label="Tab A">
                    <div>Tab Content</div>
                </Tab>
            </TabContext.Provider>,
        )

        expect(addTab).toHaveBeenCalledWith({ value: 'a', label: 'Tab A' })
        expect(screen.getByText('Tab Content')).toBeInTheDocument()

        rerender(
            <TabContext.Provider value={{ activeTab: 'b', addTab }}>
                <Tab value="a" label="Tab A">
                    <div>Tab Content</div>
                </Tab>
            </TabContext.Provider>,
        )

        expect(screen.queryByText('Tab Content')).toBeNull()
    })
})
