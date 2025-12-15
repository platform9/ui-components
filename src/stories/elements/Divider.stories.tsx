import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Divider from '../../elements/Divider'

const meta: Meta<typeof Divider> = {
  title: 'Elements/Divider',
  component: Divider,
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'CSS class name to override styles',
      table: {
        type: { summary: 'string' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Divider>

const baseArgs = {}

export const Default: Story = {
  args: {
    ...baseArgs,
  },
}

export const Gallery: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div style={{ width: '100%', padding: '20px' }}>
      <div>
        <strong>Default Divider:</strong>
        <p>Content above</p>
        <Divider {...args} />
        <p>Content below</p>
      </div>
    </div>
  ),
}
