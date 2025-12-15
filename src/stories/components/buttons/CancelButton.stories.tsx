import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CancelButton from '../../../components/buttons/CancelButton'

type CancelButtonProps = React.ComponentProps<typeof CancelButton>

const meta: Meta<CancelButtonProps> = {
  title: 'Components/Buttons/CancelButton',
  component: CancelButton,
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<CancelButtonProps>

export const Default: Story = {
  args: {
    children: 'Cancel',
  },
}

export const CustomLabel: Story = {
    args: {
        children: 'Abort',
    }
}
