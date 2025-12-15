import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Tooltip, { TooltipProps } from '../../elements/tooltip/Tooltip'
import Button from '../../elements/button/Button'

const meta: Meta<TooltipProps> = {
  title: 'Elements/Tooltip',
  component: Tooltip,
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'Tooltip message content',
    },
    align: {
      control: { type: 'object' },
      description: 'Alignment object { vertical, horizontal }',
    },
    customClassName: {
      control: { type: 'text' },
      description: 'Custom CSS class',
    },
  },
}

export default meta

type Story = StoryObj<TooltipProps>

const baseArgs: Partial<TooltipProps> = {
  message: 'This is a tooltip message',
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => (
    <div style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip {...args}>
        <Button>Hover Me</Button>
      </Tooltip>
    </div>
  ),
}

export const Gallery: Story = {
  args: baseArgs,
  render: (args) => (
    <div style={{ padding: '50px', display: 'grid', gap: '40px', gridTemplateColumns: 'repeat(3, 1fr)', justifyItems: 'center' }}>
      <Tooltip {...args} message="Top Left" align={{ vertical: 'top', horizontal: 'left' }}>
        <Button>Top Left</Button>
      </Tooltip>
      <Tooltip {...args} message="Top Middle" align={{ vertical: 'top', horizontal: 'middle' }}>
        <Button>Top Middle</Button>
      </Tooltip>
      <Tooltip {...args} message="Top Right" align={{ vertical: 'top', horizontal: 'right' }}>
        <Button>Top Right</Button>
      </Tooltip>

      <Tooltip {...args} message="Middle Left" align={{ vertical: 'middle', horizontal: 'left' }}>
        <Button>Middle Left</Button>
      </Tooltip>
      <div style={{ width: '100px' }}></div>
      <Tooltip {...args} message="Middle Right" align={{ vertical: 'middle', horizontal: 'right' }}>
        <Button>Middle Right</Button>
      </Tooltip>

      <Tooltip {...args} message="Bottom Left" align={{ vertical: 'bottom', horizontal: 'left' }}>
        <Button>Bottom Left</Button>
      </Tooltip>
      <Tooltip {...args} message="Bottom Middle" align={{ vertical: 'bottom', horizontal: 'middle' }}>
        <Button>Bottom Middle</Button>
      </Tooltip>
      <Tooltip {...args} message="Bottom Right" align={{ vertical: 'bottom', horizontal: 'right' }}>
        <Button>Bottom Right</Button>
      </Tooltip>
    </div>
  ),
}
