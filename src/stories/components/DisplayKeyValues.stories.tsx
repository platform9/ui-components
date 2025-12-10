import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DisplayKeyValues from '../../components/DisplayKeyValues'
import Text from '../../elements/Text'

type DisplayKeyValuesProps = React.ComponentProps<typeof DisplayKeyValues>

const meta: Meta<DisplayKeyValuesProps> = {
  title: 'Components/DisplayKeyValues',
  component: DisplayKeyValues,
  argTypes: {
    keyValuePairs: {
      control: { type: 'object' },
      description: 'Array of { key, value } objects',
    },
    rowSpacing: {
      control: { type: 'number' },
      description: 'Spacing between rows in px',
    },
    alignKeyRight: {
      control: { type: 'boolean' },
      description: 'Align keys to the right',
    },
    limitValueLength: {
      control: { type: 'boolean' },
      description: 'Truncate long values',
    },
  },
}

export default meta

type Story = StoryObj<DisplayKeyValuesProps>

const baseArgs: DisplayKeyValuesProps = {
  keyValuePairs: [
    { key: 'Name', value: 'John Doe' },
    { key: 'Email', value: 'john.doe@example.com' },
    { key: 'Role', value: 'Administrator' },
    { key: 'Status', value: <Text variant="body2" style={{ color: 'green' }}>Active</Text> },
  ],
  rowSpacing: 12,
  alignKeyRight: true,
}

export const Default: Story = {
  args: baseArgs,
}

export const LeftAlignedKeys: Story = {
  args: {
    ...baseArgs,
    alignKeyRight: false,
  },
}

export const LongValues: Story = {
  args: {
    ...baseArgs,
    limitValueLength: true,
    keyValuePairs: [
        { key: 'Short', value: 'Short value' },
        { 
            key: 'Long', 
            value: 'This is a very long value that should be truncated because it exceeds the character limit set by the component logic when limitValueLength is true. ' + 'repeat '.repeat(50) 
        },
    ]
  },
}
