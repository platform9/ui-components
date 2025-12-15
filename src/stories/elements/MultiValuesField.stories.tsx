import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import MultiValuesField from '../../elements/MultiValuesField'
import ValidatedForm from '../../components/validatedForm/ValidatedForm'

// Wrapper to provide ValidatedForm context
const FormWrapper = ({ children, initialValues = {} }) => {
  return (
    <ValidatedForm initialValues={initialValues} onSubmit={(values) => console.log('Submit:', values)}>
      {children}
    </ValidatedForm>
  )
}

const meta: Meta<React.ComponentProps<typeof MultiValuesField>> = {
  title: 'Elements/MultiValuesField',
  component: MultiValuesField,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label for the field',
    },
    addLabel: {
      control: { type: 'text' },
      description: 'Label for the add button',
    },
    placeholderText: {
      control: { type: 'text' },
      description: 'Placeholder text for inputs',
    },
    info: {
      control: { type: 'text' },
      description: 'Tooltip info text',
    },
    id: {
      control: { type: 'text' },
      description: 'Form field ID',
      table: {
          type: { summary: 'string' }
      }
    }
  },
}

export default meta

type Story = StoryObj<React.ComponentProps<typeof MultiValuesField>>

const baseArgs = {
  id: 'multi-values-test',
  label: 'Multi Values',
  addLabel: 'Add Value',
  placeholderText: 'Enter value...',
  items: ['Value 1', 'Value 2'],
  onChange: () => {},
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => (
    <FormWrapper>
      <MultiValuesField {...(args as any)} />
    </FormWrapper>
  ),
}

export const Empty: Story = {
  args: {
    ...baseArgs,
    items: [],
  },
  render: (args) => (
    <FormWrapper>
      <MultiValuesField {...(args as any)} />
    </FormWrapper>
  ),
}

export const WithInfo: Story = {
  args: {
    ...baseArgs,
    info: 'This is some helpful information about the field.',
  },
  render: (args) => (
    <FormWrapper>
      <MultiValuesField {...(args as any)} />
    </FormWrapper>
  ),
}

export const Gallery: Story = {
  args: baseArgs,
  render: (args) => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <FormWrapper>
        <strong>Default:</strong>
        <MultiValuesField {...(args as any)} id="gallery-default" />
      </FormWrapper>
      
      <FormWrapper>
        <strong>With Info Tooltip:</strong>
        <MultiValuesField 
            {...(args as any)} 
            id="gallery-info" 
            info="Tooltip info here" 
            label="Field with Info"
        />
      </FormWrapper>
    </div>
  ),
}
