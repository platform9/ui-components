import React from 'react'
import { render, screen } from '../../test-utils'
import GridEmptyContent from './GridEmptyContent'

describe('GridEmptyContent', () => {
    it('renders string children with no-data-found test id', () => {
        render(<GridEmptyContent>No rows</GridEmptyContent>)
        expect(screen.getByTestId('no-data-found')).toHaveTextContent('No rows')
    })
})
