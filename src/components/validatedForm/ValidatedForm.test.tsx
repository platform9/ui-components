import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import ValidatedForm from './ValidatedForm'
import TextField from './TextField'

describe('ValidatedForm', () => {
    it('calls onSubmit with defined field values', async () => {
        const onSubmit = jest.fn()
        const { container } = render(
            <ValidatedForm onSubmit={onSubmit} elevated={false}>
                <TextField id="name" label="Name" />
            </ValidatedForm>,
        )

        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Alice' } })
        fireEvent.submit(container.querySelector('form') as HTMLFormElement)

        expect(onSubmit).toHaveBeenCalledWith({ name: 'Alice' })
    })
})
