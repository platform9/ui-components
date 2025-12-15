import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import PieUsageWidget from '../../../components/widgets/PieUsageWidget'

type PieUsageWidgetProps = React.ComponentProps<typeof PieUsageWidget>

const meta: Meta<PieUsageWidgetProps> = {
  title: 'Components/Widgets/PieUsageWidget',
  component: PieUsageWidget,
  argTypes: {
    primary: { control: 'text' },
    showPercent: { control: 'boolean' },
    sideLength: { control: 'number' },
    arcWidth: { control: 'number' },
  },
}

export default meta

type Story = StoryObj<PieUsageWidgetProps>

const data: any[] = [
    { name: 'CPU', value: 65, color: 'primary', info: 'CPU Usage' },
    { name: 'Free', value: 35, color: 'tray' },
]

export const Default: Story = {
  args: {
    data: data,
    primary: 'CPU',
    sideLength: 200,
  },
}

export const LowUsage: Story = {
  args: {
    data: [
        { name: 'CPU', value: 10, color: 'primary' },
        { name: 'Free', value: 90, color: 'tray' },
    ],
    primary: 'CPU',
    sideLength: 200,
  },
}

export const HighUsage: Story = {
  args: {
    data: [
        { name: 'CPU', value: 95, color: 'error' },
        { name: 'Free', value: 5, color: 'tray' },
    ],
    primary: 'CPU',
    sideLength: 200,
  },
}
