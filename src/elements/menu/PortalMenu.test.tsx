import React from 'react'
import { render } from '../../test-utils'
import ReactDOM from 'react-dom'
import PortalMenu from './PortalMenu'

describe('PortalMenu', () => {
    it('creates a portal into row-menu-portal-root when open', () => {
        const root = document.createElement('div')
        root.id = 'row-menu-portal-root'
        document.body.appendChild(root)

        const spy = jest.spyOn(ReactDOM, 'createPortal')

        render(
            <PortalMenu open anchor={<button type="button">Anchor</button>} onClose={jest.fn()}>
                <div>Item</div>
            </PortalMenu>,
        )

        expect(spy).toHaveBeenCalled()
        const portalArgs = spy.mock.calls.find((c) => c[1] === root)
        expect(portalArgs).toBeTruthy()

        spy.mockRestore()
        document.body.removeChild(root)
    })
})
