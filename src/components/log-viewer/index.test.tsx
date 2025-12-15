import React from 'react'
import { render, screen } from '../../test-utils'
import LogViewer from './index'

describe('LogViewer', () => {
    it('renders each log line', () => {
        render(<LogViewer logs={'line1\nline2'} />)

        expect(screen.getByText('line1')).toBeInTheDocument()
        expect(screen.getByText('line2')).toBeInTheDocument()
    })

    it('renders line numbers when enabled', () => {
        render(<LogViewer logs={['a', 'b']} lineNumbers />)

        expect(screen.getByText('0')).toBeInTheDocument()
        expect(screen.getByText('1')).toBeInTheDocument()
    })
})
