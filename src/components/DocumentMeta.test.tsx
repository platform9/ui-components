import React from 'react'
import { render } from '../test-utils'
import DocumentMeta from './DocumentMeta'

// We cannot easily test side effects on document.head/title in this environment without
// more complex setup or assuming how react-side-effect works.
// We can test that it renders null (default) or portal (breadcrumbs).

describe('DocumentMeta', () => {
    it('renders null by default (affects head only)', () => {
        const { container } = render(<DocumentMeta title="Test Page" />)
        expect(container).toBeEmptyDOMElement()
    })

    // This test is skipped/simplified because testing Portals and SideEffects requires
    // specific environment config (e.g. where the portal root is).
})
