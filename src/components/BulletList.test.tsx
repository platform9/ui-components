import React from 'react'
import { render, screen } from '../test-utils'
import BulletList from './BulletList'

describe('BulletList', () => {
    it('renders list items (strings)', () => {
        const items = ['Item 1', 'Item 2']
        render(<BulletList items={items} />)
        expect(screen.getByText('Item 1')).toBeInTheDocument()
        expect(screen.getByText('Item 2')).toBeInTheDocument()
    })

    it('renders list items (JSX)', () => {
        const items = [<span key="1">JSX Item</span>]
        render(<BulletList items={items} />)
        expect(screen.getByText('JSX Item')).toBeInTheDocument()
    })
})
