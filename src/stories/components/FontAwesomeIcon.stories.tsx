import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

type FontAwesomeIconProps = React.ComponentProps<typeof FontAwesomeIcon>

const meta: Meta<FontAwesomeIconProps> = {
  title: 'Components/FontAwesomeIcon',
  component: FontAwesomeIcon,
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Icon name (without fa- prefix)',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'lg', '2x', '3x', '5x', '7x', '10x'],
      description: 'Size of the icon',
    },
    solid: {
      control: { type: 'boolean' },
      description: 'Solid style',
    },
    regular: {
      control: { type: 'boolean' },
      description: 'Regular style',
    },
    light: {
      control: { type: 'boolean' },
      description: 'Light style',
    },
    brand: {
        control: { type: 'boolean' },
        description: 'Brand style',
    },
    spin: {
      control: { type: 'boolean' },
      description: 'Spin animation',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
  },
}

export default meta

type Story = StoryObj<FontAwesomeIconProps>

const baseArgs: FontAwesomeIconProps = {
  children: 'user',
  size: '2x',
  solid: true,
}

export const Default: Story = {
  args: baseArgs,
}

export const Solid: Story = {
  args: {
    ...baseArgs,
    children: 'check-circle',
    solid: true,
  },
}

export const Regular: Story = {
  args: {
    ...baseArgs,
    children: 'check-circle',
    solid: false,
    regular: true,
  },
}

export const Brands: Story = {
    args: {
        ...baseArgs,
        children: 'github',
        solid: false,
        brand: true,
    }
}

export const Spinning: Story = {
  args: {
    ...baseArgs,
    children: 'spinner',
    spin: true,
  },
}

export const Gallery: Story = {
  args: baseArgs,
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <FontAwesomeIcon {...args} name="home" />
      <FontAwesomeIcon {...args} name="user" />
      <FontAwesomeIcon {...args} name="cog" spin />
      <FontAwesomeIcon {...args} name="trash" size="3x" />
      <FontAwesomeIcon {...args} name="ban" disabled />
    </div>
  ),
}
