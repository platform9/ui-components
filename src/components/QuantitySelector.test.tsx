import React from 'react'
import { render, fireEvent, screen } from '../test-utils'
import QuantitySelector from './QuantitySelector'

// Because QuantitySelector uses TextField which uses withFormContext, we need to wrap it.
import ValidatedForm from './validatedForm/ValidatedForm'

const WrappedQuantitySelector = (props) => (
    // @ts-ignore
    <ValidatedForm>
        <QuantitySelector {...props} />
    </ValidatedForm>
)

describe('QuantitySelector', () => {
    it('renders with initial value', () => {
        const { getByTestId } = render(<WrappedQuantitySelector onChange={() => { }} value={5} />)
        const input = getByTestId('quantity-input-field') as HTMLInputElement
        expect(input.value).toBe('5')
    })

    it('increments value', () => {
        const handleChange = jest.fn()
        const { getByTestId } = render(<WrappedQuantitySelector onChange={handleChange} value={5} />)

        fireEvent.click(getByTestId('increment-btn'))

        expect(handleChange).toHaveBeenCalledWith(6)
    })

    it('decrements value', () => {
        const handleChange = jest.fn()
        const { getByTestId } = render(<WrappedQuantitySelector onChange={handleChange} value={5} />)

        fireEvent.click(getByTestId('decrement-btn'))

        expect(handleChange).toHaveBeenCalledWith(4)
    })
})
