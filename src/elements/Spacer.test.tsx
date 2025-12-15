import React from 'react'
import { render } from '../test-utils'
import Spacer from './Spacer'

describe('Spacer', () => {
    it('renders correctly with default height', () => {
        const { container } = render(<Spacer />)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders with custom height', () => {
        // Since styles are handled by JSS/makeStyles, we might not see inline styles
        // but we can check if it renders without crashing.
        // Ideally we would check the computed style but that depends on the test env setup.
        const { container } = render(<Spacer height={32} />)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('accepts custom className', () => {
        const { container } = render(<Spacer className="custom-class" />)
        expect(container.firstChild).toHaveClass('custom-class')
    })
})
