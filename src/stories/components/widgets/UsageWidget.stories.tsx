import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import UsageWidget from '../../../components/widgets/UsageWidget'

type UsageWidgetProps = React.ComponentProps<typeof UsageWidget>

const meta: Meta<UsageWidgetProps> = {
  title: 'Components/Widgets/UsageWidget',
  component: UsageWidget,
  argTypes: {
    title: { control: 'text' },
    units: { control: 'text' },
    precision: { control: 'number' },
    usedText: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<UsageWidgetProps>

const baseArgs: UsageWidgetProps = {
  title: 'Memory Usage',
  units: 'GB',
  stats: {
      current: 8,
      max: 16,
      percent: 50,
  },
}

export const Default: Story = {
  args: baseArgs,
}

export const HighUsage: Story = {
  args: {
    ...baseArgs,
    title: 'Storage Usage',
    units: 'TB',
    stats: {
        current: 9.5,
        max: 10,
        percent: 95,
    },
  },
}
