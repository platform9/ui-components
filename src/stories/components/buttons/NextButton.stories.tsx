import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import NextButton from '../../../components/buttons/NextButton'

type NextButtonProps = React.ComponentProps<typeof NextButton>

const meta: Meta<NextButtonProps> = {
  title: 'Components/Buttons/NextButton',
  component: NextButton,
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
    showForward: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<NextButtonProps>

export const Default: Story = {
  args: {
    children: 'Next Step',
  },
}

export const NoIcon: Story = {
    args: {
        children: 'Continue',
        showForward: false,
    }
}
