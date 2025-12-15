import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import PollingData from '../../components/PollingData'
import Button from '../../elements/button/Button'

type PollingDataProps = React.ComponentProps<typeof PollingData>

const meta: Meta<PollingDataProps> = {
  title: 'Components/PollingData',
  component: PollingData,
  argTypes: {
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state',
    },
    hidden: {
      control: { type: 'boolean' },
      description: 'Hide the control',
    },
    pause: {
      control: { type: 'boolean' },
      description: 'Pause polling',
    },
    pollIntervalMs: {
      control: { type: 'number' },
      description: 'Polling interval in ms',
    },
    onReload: { action: 'reloaded' },
  },
}

export default meta

type Story = StoryObj<PollingDataProps>

const baseArgs: PollingDataProps = {
  loading: false,
  hidden: false,
  pause: false,
  pollIntervalMs: 2000,
  onReload: async () => new Promise(resolve => setTimeout(resolve, 1000)),
  refreshDuration: 10000,
}

const Wrapper = (args: PollingDataProps) => {
    const [loading, setLoading] = useState(args.loading)
    
    const handleReload = async () => {
        setLoading(true)
        args.onReload?.(true, false)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setLoading(false)
    }

    return (
        <div style={{ padding: 20 }}>
            <PollingData 
                {...args}
                loading={loading}
                onReload={handleReload}
            />
        </div>
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />,
}

export const Loading: Story = {
  args: {
    ...baseArgs,
    loading: true,
  },
  render: (args) => <Wrapper {...args} />,
}

export const Paused: Story = {
  args: {
    ...baseArgs,
    pause: true,
  },
  render: (args) => <Wrapper {...args} />,
}
