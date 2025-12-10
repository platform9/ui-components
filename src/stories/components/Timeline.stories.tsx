import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Timeline from '../../components/Timeline'

type TimelineProps = React.ComponentProps<typeof Timeline>

const meta: Meta<TimelineProps> = {
  title: 'Components/Timeline',
  component: Timeline,
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array of step labels',
    },
    activeStep: {
      control: { type: 'number' },
      description: 'Current active step index (1-based)',
    },
  },
}

export default meta

type Story = StoryObj<TimelineProps>

const baseArgs: TimelineProps = {
  items: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
  activeStep: 1,
}

export const Default: Story = {
  args: baseArgs,
}

export const MidProgress: Story = {
  args: {
    ...baseArgs,
    activeStep: 2,
  },
}

export const Completed: Story = {
  args: {
    ...baseArgs,
    activeStep: 4,
  },
}
