import React from 'react'
import { render } from '../test-utils'
import ProductInfoPage from './ProductInfoPage'

describe('ProductInfoPage', () => {
    it('renders correctly', () => {
        render(
            <ProductInfoPage title="Test Title" actions={[]}>
                Test content
            </ProductInfoPage>
        )
    })
})
