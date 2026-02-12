import React from 'react'
import { render, fireEvent, screen } from '../test-utils'
import SingleSelect from './SingleSelect'

import ValidatedForm from './validatedForm/ValidatedForm'

const WrappedSingleSelect = (props) => (
  // @ts-ignore
  <ValidatedForm>
    <SingleSelect {...props} />
  </ValidatedForm>
)

describe('SingleSelect', () => {
  const options = [
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
  ]

  it('renders label and options', () => {
    render(<WrappedSingleSelect id="ss" label="Select One" options={options} />)
    expect(screen.getByText('Select One')).toBeInTheDocument()
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('allows searching', () => {
    const { getByRole, queryByText } = render(
      <WrappedSingleSelect id="ss" label="Select" options={options} />,
    )
    const searchInput = getByRole('textbox')
    fireEvent.change(searchInput, { target: { value: 'Apple' } })
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(queryByText('Banana')).not.toBeInTheDocument()
  })
})
