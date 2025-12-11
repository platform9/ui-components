import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import SingleSelect from '../../components/SingleSelect'
import ValidatedForm from '../../components/validatedForm/ValidatedForm'

type SingleSelectProps = React.ComponentProps<typeof SingleSelect>

const meta: Meta<SingleSelectProps> = {
  title: 'Components/SingleSelect',
  component: SingleSelect,
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Input label',
    },
    options: {
      control: { type: 'object' },
      description: 'Options array',
    },
    value: {
      control: { type: 'text' },
      description: 'Selected value',
    },
    onChange: { action: 'changed' },
    errorMessage: {
        control: { type: 'text' },
        description: 'Error message',
    },
    hasError: {
        control: { type: 'boolean' },
        description: 'Error state',
    },
    required: {
        control: { type: 'boolean' },
        description: 'Required field',
    },
    maxOptions: {
        control: { type: 'number' },
        description: 'Max visible options',
    }
  },
}

export default meta

type Story = StoryObj<SingleSelectProps>

const baseArgs: SingleSelectProps = {
  id: 'single-select-demo',
  label: 'Select Item',
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ],
  value: '',
  onChange: () => {},
}

const Wrapper = (args: SingleSelectProps) => {
    const [value, setValue] = useState(args.value)
    
    return (
        <ValidatedForm>
            <div style={{ maxWidth: 400 }}>
                <SingleSelect 
                    {...args}
                    value={value}
                    onChange={(val) => {
                        setValue(val)
                        args.onChange?.(val)
                    }}
                />
            </div>
        </ValidatedForm>
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />,
}

export const PreSelected: Story = {
  args: {
    ...baseArgs,
    value: '2',
  },
  render: (args) => <Wrapper {...args} />,
}

export const WithError: Story = {
  args: {
    ...baseArgs,
    hasError: true,
    errorMessage: 'Selection is required',
    required: true,
  },
  render: (args) => <Wrapper {...args} />,
}
