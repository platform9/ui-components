import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import PrevButton from '../../../components/buttons/PrevButton'

type PrevButtonProps = React.ComponentProps<typeof PrevButton>

const meta: Meta<PrevButtonProps> = {
  title: 'Components/Buttons/PrevButton',
  component: PrevButton,
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<PrevButtonProps>

export const Default: Story = {
  args: {
    children: 'Go Back',
  },
}

export const Disabled: Story = {
    args: {
        children: 'Back',
        disabled: true,
    }
}
