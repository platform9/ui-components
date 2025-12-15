import React from 'react'
import { render, screen, waitFor } from '../../test-utils'
import PageContainerHeader from './PageContainerHeader'
import PageContainer from './PageContainer'

describe('PageContainerHeader', () => {
    it('portals children into the PageContainer extra header area', async () => {
        render(
            <PageContainer {...({ floatingHeader: true } as any)}>
                <PageContainerHeader>
                    <div>Extra Header Content</div>
                </PageContainerHeader>
            </PageContainer>,
        )

        await waitFor(() => {
            expect(screen.getByText('Extra Header Content')).toBeInTheDocument()
        })
    })
})
