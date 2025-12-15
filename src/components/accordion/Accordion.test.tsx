import React from 'react'
import { fireEvent, render, waitFor } from '../../test-utils'
import Accordion from './Accordion'

describe('Accordion', () => {
    it('toggles the content maxHeight when clicking the header (uncontrolled)', async () => {
        const { container } = render(
            <Accordion id="acc-1" title="Section">
                <div>Body</div>
            </Accordion>,
        )

        const topBar = container.querySelector('.accordionTopBar') as HTMLDivElement
        const content = container.querySelector('.accordionContent') as HTMLDivElement

        expect(topBar).toBeInTheDocument()
        expect(content).toBeInTheDocument()
        expect(content).toHaveStyle({ maxHeight: '0px' })

        // JSDOM doesn't calculate layout, so we provide a fake scrollHeight.
        Object.defineProperty(content, 'scrollHeight', {
            configurable: true,
            value: 120,
        })

        fireEvent.click(topBar)
        await waitFor(() => expect(content).toHaveStyle({ maxHeight: '120px' }))

        fireEvent.click(topBar)
        await waitFor(() => expect(content).toHaveStyle({ maxHeight: '0px' }))
    })
})
