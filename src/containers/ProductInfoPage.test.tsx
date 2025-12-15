import React from 'react'
import { render, screen } from '../test-utils'
import ProductInfoPage from './ProductInfoPage'

describe('ProductInfoPage', () => {
    it('renders title/body/footer and calls lifecycle callbacks', () => {
        const componentDidMountFn = jest.fn()
        const componentWillUnmountFn = jest.fn()
        render(
            <ProductInfoPage title="Test Title" actions={[] }>
                Test content
            </ProductInfoPage>
        )

        expect(screen.getByText('Test Title')).toBeInTheDocument()
        expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('invokes mount and unmount callbacks', () => {
        const componentDidMountFn = jest.fn()
        const componentWillUnmountFn = jest.fn()

        const { unmount } = render(
            <ProductInfoPage
                title="Test Title"
                actions={[]}
                componentDidMountFn={componentDidMountFn}
                componentWillUnmountFn={componentWillUnmountFn}
            >
                Test content
            </ProductInfoPage>,
        )

        expect(componentDidMountFn).toHaveBeenCalledTimes(1)
        unmount()
        expect(componentWillUnmountFn).toHaveBeenCalledTimes(1)
    })
})
