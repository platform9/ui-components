import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CreateButton from '../../../components/buttons/CreateButton'

type CreateButtonProps = React.ComponentProps<typeof CreateButton>

const meta: Meta<CreateButtonProps> = {
  title: 'Components/Buttons/CreateButton',
  component: CreateButton,
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
}

export default meta

type Story = StoryObj<CreateButtonProps>

export const Default: Story = {
  args: {
    children: 'Create Item',
  },
}
