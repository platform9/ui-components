import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import SubmitButton from '../../components/SubmitButton'

type SubmitButtonProps = React.ComponentProps<typeof SubmitButton>

const meta: Meta<SubmitButtonProps> = {
  title: 'Components/SubmitButton',
  component: SubmitButton,
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Button label',
    },
  },
}

export default meta

type Story = StoryObj<SubmitButtonProps>

const baseArgs: SubmitButtonProps = {
  children: 'Submit Form',
}

export const Default: Story = {
  args: baseArgs,
}

export const CustomLabel: Story = {
  args: {
    ...baseArgs,
    children: 'Save Changes',
  },
}
