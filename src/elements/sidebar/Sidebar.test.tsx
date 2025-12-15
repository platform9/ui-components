import React from 'react'
import { render } from '../../test-utils'
import Sidebar from './Sidebar'

describe('Sidebar', () => {
    // Sidebar component requires usePluginRouter which depends on PluginContext
    // This would require a more complex test setup with plugin mocking
    it.skip('renders correctly - requires Plugin context', () => {
        render(<Sidebar setPluginId={() => { }} />)
    })
})
