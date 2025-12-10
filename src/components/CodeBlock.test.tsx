import React from 'react'
import { render } from '../test-utils'
import CodeBlock from './CodeBlock'

describe('CodeBlock', () => {
    it('renders code content', () => {
        const code = 'console.log("hello")'
        const { getByText, container } = render(<CodeBlock>{code}</CodeBlock>)
        expect(getByText(code)).toBeInTheDocument()
        expect(container.querySelector('pre')).toBeInTheDocument()
        expect(container.querySelector('code')).toBeInTheDocument()
    })
})
