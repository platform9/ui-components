import React from 'react'
import { render, fireEvent } from '../test-utils'
import MultiValuesField from './MultiValuesField'

// Mock uuid to have consistent IDs if needed, though we can test by querying elements
jest.mock('uuid', () => ({
    v4: () => 'test-id-' + Math.random()
}))

import ValidatedForm from '../components/validatedForm/ValidatedForm'

// Wraps component in ValidatedForm for context
const WrappedMultiValuesField = (props) => (
    // @ts-ignore
    <ValidatedForm>
        <MultiValuesField {...props} />
    </ValidatedForm>
)

describe('MultiValuesField', () => {
    const defaultProps = {
        id: 'test-field',
        label: 'Test Field',
        addLabel: 'Add Item',
        items: ['Item 1'],
        onChange: jest.fn(),
    }

    it('renders label and initial items', () => {
        const { getByDisplayValue, getByText } = render(<WrappedMultiValuesField {...defaultProps} />)
        expect(getByText('Test Field')).toBeInTheDocument()
        expect(getByDisplayValue('Item 1')).toBeInTheDocument()
    })

    it('renders add button', () => {
        const { getByText } = render(<WrappedMultiValuesField {...defaultProps} />)
        expect(getByText('Add Item')).toBeInTheDocument()
    })

    it('adds a new item when add button is clicked', async () => {
        const { getByText, getAllByRole, container } = render(<WrappedMultiValuesField {...defaultProps} />)
        // The click handler is on the FontAwesomeIcon, not the text.
        // We find the icon by its class or we can query by container.
        const addIcon = container.querySelector('.fa-plus-circle')
        fireEvent.click(addIcon!)
        const inputs = await getAllByRole('textbox')
        expect(inputs).toHaveLength(2)
    })
})
