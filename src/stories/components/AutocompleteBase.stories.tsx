import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import AutocompleteBase from '../../components/AutocompleteBase'

type AutocompleteBaseProps = React.ComponentProps<typeof AutocompleteBase>

const meta: Meta<AutocompleteBaseProps> = {
  title: 'Components/AutocompleteBase',
  component: AutocompleteBase,
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Input label/placeholder',
    },
    initialValue: {
      control: { type: 'text' },
      description: 'Initial input value',
    },
    suggestions: {
      control: { type: 'object' },
      description: 'Array of suggestion strings',
    },
    onChange: { action: 'changed' },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Full width input',
    },
  },
}

export default meta

type Story = StoryObj<AutocompleteBaseProps>

const baseArgs: Partial<AutocompleteBaseProps> = {
  label: 'Search...',
  suggestions: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'],
  value: '',
  onChange: () => {},
}

const Wrapper = (args: any) => {
    const [value, setValue] = useState(args.initialValue || '')
    return (
        <div style={{ padding: 20 }}>
            <AutocompleteBase 
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

export const PreFilled: Story = {
  args: {
    ...baseArgs,
    initialValue: 'Ban',
  },
  render: (args) => <Wrapper {...args} />,
}

export const Gallery: Story = {
    args: baseArgs,
    render: (args) => (
        <div style={{ display: 'grid', gap: 20 }}>
            <div>
                <strong>Default:</strong>
                <Wrapper {...args} />
            </div>
            <div>
                <strong>With Many Suggestions:</strong>
                <Wrapper 
                    {...args} 
                    suggestions={[
                        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 
                        'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'
                    ]} 
                    label="Select State"
                />
            </div>
        </div>
    )
}
