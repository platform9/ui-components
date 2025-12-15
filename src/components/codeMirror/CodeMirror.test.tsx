import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import CodeMirror from './CodeMirror'

jest.mock('codemirror/mode/yaml/yaml', () => ({}))
jest.mock('codemirror/mode/javascript/javascript', () => ({}))
jest.mock('codemirror/mode/xml/xml', () => ({}))
jest.mock('codemirror/addon/display/autorefresh', () => ({}))
jest.mock('codemirror/addon/search/searchcursor', () => ({}))
jest.mock('codemirror/addon/mode/simple', () => ({}))

jest.mock('react-codemirror2', () => ({
    Controlled: ({ value, onBeforeChange, editorDidMount }: any) => {
        if (editorDidMount) {
            editorDidMount({
                getSearchCursor: () => ({
                    findNext: () => false,
                    from: () => ({ line: 0, ch: 0 }),
                    to: () => ({ line: 0, ch: 0 }),
                    pos: { from: { line: 0 } },
                }),
                markText: () => {},
                scrollIntoView: () => {},
                doc: {
                    getAllMarks: () => [],
                },
            })
        }

        return (
            <textarea
                data-testid="codemirror"
                value={value}
                onChange={(e) => onBeforeChange({}, {}, (e.target as HTMLTextAreaElement).value)}
            />
        )
    },
}))

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
    it.skip('calls onChange when the editor value changes', () => {
        const onChange = jest.fn()
        render(<CodeMirror value="a" onChange={onChange} />)

        fireEvent.change(screen.getByTestId('codemirror'), { target: { value: 'b' } })
        expect(onChange).toHaveBeenCalledWith('b')
    })
})
