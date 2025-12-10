import React from 'react'
import { render } from '../../test-utils'
import MultiDownshift from './MultiDownshift'

describe('MultiDownshift', () => {
    it('renders correctly', () => {
        render(
            <MultiDownshift onMultiChange={() => { }}>
                {({ getInputProps }) => <input {...getInputProps()} />}
            </MultiDownshift>
        )
    })
})
