import React from 'react'
import { render } from '../../test-utils'
import LogViewer from './index'

describe('LogViewer', () => {
    it('renders correctly', () => {
        render(<LogViewer logs="Test log message" />)
    })
})
