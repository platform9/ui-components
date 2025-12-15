import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import InfoTooltip from '../../components/InfoTooltip'
import Button from '../../elements/button/Button'

type InfoTooltipProps = React.ComponentProps<typeof InfoTooltip>

const meta: Meta<InfoTooltipProps> = {
  title: 'Components/InfoTooltip',
  component: InfoTooltip,
  argTypes: {
    info: {
      control: { type: 'text' },
      description: 'Tooltip content',
    },
    align: {
      control: { type: 'object' },
      description: 'Alignment object',
    },
    offset: {
      control: { type: 'object' },
      description: 'Offset object',
    },
  },
}

export default meta

type Story = StoryObj<InfoTooltipProps>

const baseArgs: Partial<InfoTooltipProps> = {
  info: 'This is an info tooltip',
  align: { vertical: 'top', horizontal: 'middle' },
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => (
      <div style={{ padding: 50, display: 'flex', justifyContent: 'center' }}>
          <InfoTooltip {...args}>
              <Button>Hover Me</Button>
          </InfoTooltip>
      </div>
  )
}
