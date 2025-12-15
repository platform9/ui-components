import React from 'react'
import { render, screen } from '../../test-utils'
import PageContainer from './PageContainer'

describe('PageContainer', () => {
    it('renders header and children', () => {
        render(
            <PageContainer {...({ floatingHeader: true, header: <div>Header Content</div> } as any)}>
                <div>Body Content</div>
            </PageContainer>,
        )

        expect(screen.getByText('Header Content')).toBeInTheDocument()
        expect(screen.getByText('Body Content')).toBeInTheDocument()
    })
})
