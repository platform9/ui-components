import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ProgressBar from '../../../components/progress/ProgressBar'

type ProgressBarProps = React.ComponentProps<typeof ProgressBar>

const meta: Meta<ProgressBarProps> = {
  title: 'Components/Progress/ProgressBar',
  component: ProgressBar,
  argTypes: {
    percent: { control: { type: 'range', min: 0, max: 100 } },
    width: { control: 'text' },
    height: { control: 'number' },
    animated: { control: 'boolean' },
    showPercent: { control: 'boolean' },
    containedPercent: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['progress', 'health'],
    },
    color: { control: 'color' },
  },
}

export default meta

type Story = StoryObj<ProgressBarProps>

const baseArgs: ProgressBarProps = {
  percent: 50,
  width: 300,
  height: 20,
}

export const Default: Story = {
  args: baseArgs,
}

export const Animated: Story = {
  args: {
    ...baseArgs,
    animated: true,
  },
}

export const HealthVariant: Story = {
  args: {
    ...baseArgs,
    variant: 'health',
    percent: 85, // Should show warning color (orange)
  },
}

export const CriticalHealth: Story = {
    args: {
        ...baseArgs,
        variant: 'health',
        percent: 95, // Should show error color (red)
    }
}

export const ContainedLabel: Story = {
  args: {
    ...baseArgs,
    containedPercent: true,
    height: 24, // Needs more height to fit text
  },
}

export const CustomColor: Story = {
  args: {
    ...baseArgs,
    color: 'purple',
  },
}
