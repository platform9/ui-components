import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import PasswordValidationDisplay from '../../components/PasswordValidationDisplay'

type PasswordValidationDisplayProps = React.ComponentProps<typeof PasswordValidationDisplay>

const meta: Meta<PasswordValidationDisplayProps> = {
  title: 'Components/PasswordValidationDisplay',
  component: PasswordValidationDisplay,
  argTypes: {
    values: {
      control: { type: 'object' },
      description: 'Object containing `newPassword` field to validate',
    },
  },
}

export default meta

type Story = StoryObj<PasswordValidationDisplayProps>

const baseArgs: PasswordValidationDisplayProps = {
  values: { newPassword: '' },
}

export const Default: Story = {
  args: baseArgs,
}

export const PartialMatch: Story = {
  args: {
    values: { newPassword: 'Password1' },
  },
}

export const FullMatch: Story = {
  args: {
    values: { newPassword: 'Password1!' },
  },
}
