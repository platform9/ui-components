import React from 'react'
import { render, screen } from '../test-utils'
import Row from './Row'

describe('Row', () => {
    it('renders children', () => {
        render(
            <Row>
                <div>Test content</div>
            </Row>,
        )

        expect(screen.getByText('Test content')).toBeInTheDocument()
    })
})
