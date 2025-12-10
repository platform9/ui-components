import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Spacer from '../../elements/Spacer'

const meta: Meta<typeof Spacer> = {
  title: 'Elements/Spacer',
  component: Spacer,
  argTypes: {
    height: {
      control: { type: 'number' },
      description: 'Height of the spacer in pixels',
      table: {
        defaultValue: { summary: 16 },
        type: { summary: 'number' },
      },
    },
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

type Story = StoryObj<typeof Spacer>

const baseArgs = {
  height: 16,
}

export const Default: Story = {
  args: {
    ...baseArgs,
  },
}

export const Large: Story = {
  args: {
    ...baseArgs,
    height: 48,
  },
}

export const Small: Story = {
  args: {
    ...baseArgs,
    height: 8,
  },
}

export const Gallery: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <div>
        <strong>Default Spacer (16px):</strong>
        <div style={{ background: '#eee' }}>Top Block</div>
        <Spacer {...args} height={16} />
        <div style={{ background: '#eee' }}>Bottom Block</div>
      </div>
      <hr />
      <div>
        <strong>Large Spacer (48px):</strong>
        <div style={{ background: '#eee' }}>Top Block</div>
        <Spacer {...args} height={48} />
        <div style={{ background: '#eee' }}>Bottom Block</div>
      </div>
      <hr />
      <div>
        <strong>Small Spacer (8px):</strong>
        <div style={{ background: '#eee' }}>Top Block</div>
        <Spacer {...args} height={8} />
        <div style={{ background: '#eee' }}>Bottom Block</div>
      </div>
    </div>
  ),
}
