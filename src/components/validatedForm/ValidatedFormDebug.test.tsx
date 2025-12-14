import React from 'react'
import { render, screen } from '../../test-utils'
import ValidatedFormDebug from './ValidatedFormDebug'
import ValidatedForm from './ValidatedForm'

describe('ValidatedFormDebug', () => {
    it('renders form context JSON', () => {
        render(
            <ValidatedForm elevated={false}>
                <ValidatedFormDebug />
            </ValidatedForm>,
        )

        expect(screen.getByText(/"values"/)).toBeInTheDocument()
        expect(screen.getByText(/"fields"/)).toBeInTheDocument()
    })
})
