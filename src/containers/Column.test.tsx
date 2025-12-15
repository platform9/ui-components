import React from 'react'
import { render, screen } from '../test-utils'
import Column from './Column'

describe('Column', () => {
    it('renders children', () => {
        render(
            <Column>
                <div>Test content</div>
            </Column>,
        )

        expect(screen.getByText('Test content')).toBeInTheDocument()
    })
})
