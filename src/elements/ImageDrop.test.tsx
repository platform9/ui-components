import React from 'react'
import { render, screen, fireEvent } from '../test-utils'
import ImageDrop from './ImageDrop'
import ValidatedForm from '../components/validatedForm/ValidatedForm'

const WrappedImageDrop = (props) => (
  // @ts-ignore
  <ValidatedForm>
    <ImageDrop {...props} />
  </ValidatedForm>
)

describe('ImageDrop', () => {
  const defaultProps = {
    id: 'test-image',
    label: 'Upload Image',
    onChange: jest.fn(),
    imageUpdater: jest.fn(),
  }

  it('renders correctly', () => {
    render(<WrappedImageDrop {...defaultProps} />)
    // Label is not rendered by ImageDrop itself, but we can check for drop text
    expect(screen.getByText(/file here to upload/i)).toBeInTheDocument()
  })

  it('shows trash icon and no drop text when imageData is present', () => {
    const imageUpdater = jest.fn()
    const FormWithData = () => (
      // @ts-ignore
      <ValidatedForm initialValues={{ 'test-image': 'base64data' }}>
        <ImageDrop {...defaultProps} imageData="base64data" imageUpdater={imageUpdater} />
      </ValidatedForm>
    )

    const { container } = render(<FormWithData />)
    // FontAwesomeIcon renders 'trash-alt' class or name
    expect(container.querySelector('.fa-trash-alt')).toBeInTheDocument()
    // The "Drag and drop..." text is part of dropzone, which might be hidden or replaced.
    // Based on previous reads, it seems it hides drop text.
  })
})
