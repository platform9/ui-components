import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import LogViewer from '../../../components/log-viewer'

type LogViewerProps = React.ComponentProps<typeof LogViewer>

const meta: Meta<LogViewerProps> = {
  title: 'Components/LogViewer',
  component: LogViewer,
  argTypes: {
    logs: { control: 'object' },
    size: { control: 'number' },
    lineNumbers: { control: 'boolean' },
    extraLines: {
      control: { type: 'select' },
      options: ['none', 'top', 'bottom', 'both'],
    },
  },
}

export default meta

type Story = StoryObj<LogViewerProps>

const logs = [
  '2023-10-27T10:00:00Z INFO Starting application...',
  '2023-10-27T10:00:01Z DEBUG Connecting to database...',
  '2023-10-27T10:00:02Z INFO Database connected successfully.',
  '2023-10-27T10:00:03Z WARN Retrying external service call...',
  '2023-10-27T10:00:05Z ERROR Connection failed: Timeout.',
  '   at com.example.Service.connect(Service.java:45)',
  '   at com.example.Main.main(Main.java:20)',
]

const baseArgs: LogViewerProps = {
  logs: logs,
  size: 14,
  lineNumbers: true,
  extraLines: 'none',
}

export const Default: Story = {
  args: baseArgs,
}

export const LargeText: Story = {
  args: {
    ...baseArgs,
    size: 18,
  },
}

export const NoLineNumbers: Story = {
  args: {
    ...baseArgs,
    lineNumbers: false,
  },
}

export const WithStringInput: Story = {
    args: {
        ...baseArgs,
        logs: logs.join('\n'), // Testing string input instead of array
    }
}
