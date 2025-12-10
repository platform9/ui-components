import React from 'react'
import { render } from '../../test-utils'
import CodeMirror from './CodeMirror'

// Mock Range.getBoundingClientRect which is required by CodeMirror
beforeAll(() => {
    document.createRange = () => {
        const range = new Range()
        range.getBoundingClientRect = jest.fn(() => ({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            toJSON: () => { },
        }))
        range.getClientRects = jest.fn(() => ({
            item: () => null,
            length: 0,
            [Symbol.iterator]: jest.fn(),
        }))
        return range
    }
})

describe('CodeMirror', () => {
    it('renders correctly', () => {
        render(<CodeMirror />)
    })
})
