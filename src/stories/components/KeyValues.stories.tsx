import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import KeyValues from '../../components/KeyValues'

type KeyValuesProps = React.ComponentProps<typeof KeyValues>

const meta: Meta<KeyValuesProps> = {
  title: 'Components/KeyValues',
  component: KeyValues,
  argTypes: {
    entries: {
      control: { type: 'object' },
      description: 'Initial entries',
    },
    onChange: { action: 'changed' },
    keySuggestions: {
      control: { type: 'object' },
      description: 'Suggestions for keys',
    },
    valueSuggestions: {
      control: { type: 'object' },
      description: 'Suggestions for values',
    },
    allowMultipleValues: {
      control: { type: 'boolean' },
      description: 'Allow adding multiple entries',
    },
  },
}

export default meta

type Story = StoryObj<KeyValuesProps>

const baseArgs: KeyValuesProps = {
  entries: [{ key: '', value: '' }],
  onChange: () => {},
  keySuggestions: ['Environment', 'Region', 'Zone'],
  valueSuggestions: ['Production', 'Staging', 'US-West', 'US-East'],
  allowMultipleValues: true,
}

const Wrapper = (args: KeyValuesProps) => {
    const [entries, setEntries] = useState(args.entries)
    
    return (
        <KeyValues 
            {...args}
            entries={entries}
            onChange={(newEntries) => {
                setEntries(newEntries)
                args.onChange?.(newEntries)
            }}
        />
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />,
}

export const PreFilled: Story = {
  args: {
    ...baseArgs,
    entries: [
        { key: 'Environment', value: 'Production' },
        { key: 'Region', value: 'US-West' }
    ],
  },
  render: (args) => <Wrapper {...args} />,
}

export const SingleValue: Story = {
  args: {
    ...baseArgs,
    allowMultipleValues: false,
    entries: [{ key: 'Single', value: 'Entry' }],
  },
  render: (args) => <Wrapper {...args} />,
}
