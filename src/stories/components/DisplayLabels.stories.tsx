import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DisplayLabels from '../../components/DisplayLabels'

type DisplayLabelsProps = React.ComponentProps<typeof DisplayLabels>

const meta: Meta<DisplayLabelsProps> = {
  title: 'Components/DisplayLabels',
  component: DisplayLabels,
  argTypes: {
    labels: {
      control: { type: 'object' },
      description: 'Object with key-value pairs',
    },
  },
}

export default meta

type Story = StoryObj<DisplayLabelsProps>

const baseArgs: DisplayLabelsProps = {
  labels: {
    env: 'production',
    region: 'us-west-1',
    tier: 'frontend',
  },
}

export const Default: Story = {
  args: baseArgs,
}
