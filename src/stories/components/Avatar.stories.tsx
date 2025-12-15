import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Avatar from '../../components/Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    displayName: {
      control: { type: 'text' },
      description: 'Name to derive initials from',
    },
    diameter: {
      control: { type: 'number' },
      description: 'Diameter of the avatar circle in pixels',
    },
    fontSize: {
      control: { type: 'number' },
      description: 'Font size of initials',
    },
    onClick: { action: 'clicked' },
  },
}

export default meta

type Story = StoryObj<typeof Avatar>

const baseArgs = {
  displayName: 'John Doe',
  diameter: 48,
  fontSize: 18,
}

export const Default: Story = {
  args: baseArgs,
}

export const Small: Story = {
  args: {
    ...baseArgs,
    diameter: 32,
    fontSize: 12,
  },
}

export const Large: Story = {
  args: {
    ...baseArgs,
    diameter: 80,
    fontSize: 32,
  },
}

export const ReadOnly: Story = {
  args: {
    ...baseArgs,
    onClick: undefined,
  },
}

export const Gallery: Story = {
  args: baseArgs,
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Avatar {...args} displayName="Admin User" />
      <Avatar {...args} displayName="Guest" diameter={32} fontSize={12} />
      <Avatar {...args} displayName="Super User" diameter={64} fontSize={24} />
      <Avatar {...args} displayName="Read Only" onClick={undefined} />
    </div>
  ),
}
