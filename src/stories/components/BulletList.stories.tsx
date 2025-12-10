import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import BulletList from '../../components/BulletList'
import Text from '../../elements/Text'

type BulletListProps = React.ComponentProps<typeof BulletList>

const meta: Meta<BulletListProps> = {
  title: 'Components/BulletList',
  component: BulletList,
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'List of items (string or JSX)',
    },
    type: {
      control: { type: 'text' },
      description: 'List style type (e.g. "disc", "circle", "dash")',
    },
  },
}

export default meta

type Story = StoryObj<BulletListProps>

const baseArgs: BulletListProps = {
  items: ['Item 1', 'Item 2', 'Item 3'],
  type: 'disc',
}

export const Default: Story = {
  args: baseArgs,
}

export const Dashed: Story = {
  args: {
    ...baseArgs,
    type: 'dash',
  },
}

export const CustomContent: Story = {
  args: {
    ...baseArgs,
    items: [
        'Simple string item',
        <Text variant="body2" style={{ color: 'blue' }}>Custom <strong>JSX</strong> Item</Text>,
        'Another string',
    ],
  },
}

export const Gallery: Story = {
  args: baseArgs,
  render: (args) => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div>
        <strong>Disc (Default):</strong>
        <BulletList {...args} items={args.items} type="disc" />
      </div>
      <div>
        <strong>Circle:</strong>
        <BulletList {...args} items={args.items} type="circle" />
      </div>
      <div>
        <strong>Square:</strong>
        <BulletList {...args} items={args.items} type="square" />
      </div>
      <div>
        <strong>Dash (Custom):</strong>
        <BulletList {...args} items={args.items} type="dash" />
      </div>
    </div>
  ),
}
