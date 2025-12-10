import React from 'react'
import { render } from '../test-utils'
import FormPageContainer from './FormPageContainer'

describe('FormPageContainer', () => {
    it('renders correctly', () => {
        render(<FormPageContainer primayImgUrl="">Test content</FormPageContainer>)
    })
})
