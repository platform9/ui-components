import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import ImageDrop from '../../elements/ImageDrop'
import ValidatedForm from '../../components/validatedForm/ValidatedForm'

// Wrapper to provide ValidatedForm context
const FormWrapper = ({ children, initialValues = {} }) => {
  return (
    <ValidatedForm initialValues={initialValues} onSubmit={(values) => console.log('Submit:', values)}>
      {children}
    </ValidatedForm>
  )
}

const meta: Meta<React.ComponentProps<typeof ImageDrop>> = {
  title: 'Elements/ImageDrop',
  component: ImageDrop,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    id: {
      control: { type: 'text' },
      description: 'Form field ID',
      table: {
        type: { summary: 'string' },
      },
    },
    imageUpdater: {
        action: 'imageUpdated',
        description: 'Callback with base64 image data'
    },
    onChange: {
        action: 'changed',
        description: 'Callback with file object'
    }
  },
}

export default meta

type Story = StoryObj<React.ComponentProps<typeof ImageDrop>>

const baseArgs = {
  id: 'image-drop-test',
  onChange: () => {},
  imageUpdater: () => {},
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => (
    <FormWrapper>
      <ImageDrop {...(args as any)} />
    </FormWrapper>
  ),
}

export const WithImage: Story = {
  args: baseArgs,
  render: (args) => (
    <FormWrapper initialValues={{ 'image-drop-test': 'initial-value' }}>
       {/* To pre-fill ImageDrop we might need to pass imageData prop or handle it via form state.
           ImageDrop takes `imageData` prop for preview. 
           It also takes `value`.
           But ValidatedForm passes `value` from state.
       */}
       <div style={{ marginBottom: 10 }}>Note: Preview relies on `imageData` prop (base64 string).</div>
       <ImageDrop 
         {...(args as any)} 
         imageData="iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" 
       />
    </FormWrapper>
  ),
}

export const Gallery: Story = {
  args: baseArgs,
  render: (args) => (
    <div style={{ display: 'grid', gap: '20px' }}>
        <FormWrapper>
            <strong>Default State:</strong>
            <ImageDrop {...(args as any)} id="gallery-default" />
        </FormWrapper>
        
        <FormWrapper>
            <strong>With Existing Image:</strong>
            <ImageDrop 
                {...(args as any)} 
                id="gallery-with-image"
                imageData="iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" 
            />
        </FormWrapper>

        <FormWrapper>
             <strong>With Error (Simulated):</strong>
             {/* We can simulate error by passing hasError and errorMessage directly. 
                 Although withFormContext usually handles this, passing props might override or pass through if the wrapper logic allows.
                 Actually, ValidatedFormInput renders `children(params)`. params overrides passed props usually.
                 But let's try passing hasError explicitly.
             */}
             <ImageDrop {...(args as any)} id="gallery-error" hasError={true} errorMessage="Image is required" />
        </FormWrapper>
    </div>
  ),
}
