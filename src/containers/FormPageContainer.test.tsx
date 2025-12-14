import React from 'react'
import { render, screen } from '../test-utils'
import FormPageContainer from './FormPageContainer'

describe('FormPageContainer', () => {
    it('renders left pane image and footer', () => {
        render(
            <FormPageContainer
                {...({
                    primayImgUrl: '/mgmt.png',
                    footer: <div>Footer content</div>,
                    logoText: 'Platform9',
                } as any)}
            >
                <div>Test content</div>
            </FormPageContainer>,
        )

        expect(screen.getByText('Platform9')).toBeInTheDocument()
        expect(screen.getByAltText('Platform9 Management Plane')).toBeInTheDocument()
        expect(screen.getByText('Test content')).toBeInTheDocument()
        expect(screen.getByText('Footer content')).toBeInTheDocument()
    })
})
