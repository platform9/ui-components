import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DonutWidget from '../../../components/widgets/DonutWidget'

type DonutWidgetProps = React.ComponentProps<typeof DonutWidget>

const meta: Meta<DonutWidgetProps> = {
  title: 'Components/Widgets/DonutWidget',
  component: DonutWidget,
  argTypes: {
    primary: { control: 'text' },
    showPercent: { control: 'boolean' },
    sideLength: { control: 'number' },
    arcWidth: { control: 'number' },
  },
}

export default meta

type Story = StoryObj<DonutWidgetProps>

const data: any[] = [
    { name: 'Running', value: 5, color: 'success' },
    { name: 'Pending', value: 2, color: 'warning' },
    { name: 'Failed', value: 1, color: 'error' },
]

export const Default: Story = {
  args: {
    data: data,
    sideLength: 200,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    sideLength: 200,
  },
}
