import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import MultiSelect from '../../components/MultiSelect'

type MultiSelectProps = React.ComponentProps<typeof MultiSelect>

const meta: Meta<MultiSelectProps> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
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
      control: { type: 'object' },
      description: 'Selected values',
    },
    onChange: { action: 'changed' },
    maxOptions: {
      control: { type: 'number' },
      description: 'Max visible options',
    },
  },
}

export default meta

type Story = StoryObj<MultiSelectProps>

const baseArgs: MultiSelectProps = {
  id: 'multi-select-demo',
  label: 'Choose items',
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ],
  value: [],
  onChange: () => {},
}

const Wrapper = (args: MultiSelectProps) => {
    const [value, setValue] = useState(args.value || [])
    
    return (
        <div style={{ maxWidth: 400 }}>
            <MultiSelect 
                {...args}
                value={value}
                onChange={(val) => {
                    setValue(val)
                    args.onChange?.(val)
                }}
            />
        </div>
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />,
}

export const PreSelected: Story = {
  args: {
    ...baseArgs,
    value: ['1', '3'],
  },
  render: (args) => <Wrapper {...args} />,
}
