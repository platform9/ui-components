import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import NoContentMessage from '../../components/NoContentMessage'
import Button from '../../elements/button/Button'

type NoContentMessageProps = React.ComponentProps<typeof NoContentMessage>

const meta: Meta<NoContentMessageProps> = {
  title: 'Components/NoContentMessage',
  component: NoContentMessage,
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'Message to display',
    },
    defaultHeight: {
      control: { type: 'number' },
      description: 'Minimum height of the container',
    },
  },
}

export default meta

type Story = StoryObj<NoContentMessageProps>

const baseArgs: NoContentMessageProps = {
  message: 'No data found.',
  defaultHeight: 200,
}

export const Default: Story = {
  args: baseArgs,
}

export const CustomContent: Story = {
  args: {
    ...baseArgs,
    message: undefined,
    children: (
        <div style={{ textAlign: 'center' }}>
            <p>No items to display at this time.</p>
            <Button>Refresh</Button>
        </div>
    )
  },
}
