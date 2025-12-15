import React from 'react'
import { render, screen } from '../test-utils'
import DefaultFrame from './DefaultFrame'

describe('DefaultFrame', () => {
    it('renders header, sidebar, and content', () => {
        const { container } = render(
            <DefaultFrame>
                <div>Test content</div>
            </DefaultFrame>,
        )

        expect(container.querySelector('header')).not.toBeNull()
        expect(container.querySelector('aside.sidebar')).not.toBeNull()
        expect(container.querySelector('section.content-main')).not.toBeNull()
        expect(screen.getByText('Test content')).toBeInTheDocument()
    })
})
