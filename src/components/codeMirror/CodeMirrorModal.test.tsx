import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import CodeMirrorModal from './CodeMirrorModal'

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

describe('CodeMirrorModal', () => {
    it.skip('calls onClose when the Close button is clicked', () => {
        jest.useFakeTimers()
        const onClose = jest.fn()

        const portalRoot = document.createElement('div')
        portalRoot.setAttribute('id', 'modal-portal-root')
        document.body.appendChild(portalRoot)

        const { unmount } = render(<CodeMirrorModal open label="Config" value="abc" onClose={onClose} />)

        // Flush Modal open animation timer(s) if any.
        jest.runOnlyPendingTimers()

        fireEvent.click(screen.getByRole('button', { name: 'Close' }))
        expect(onClose).toHaveBeenCalledTimes(1)

        unmount()
        portalRoot.remove()
        jest.useRealTimers()
    })
})
