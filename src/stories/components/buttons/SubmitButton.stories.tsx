import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import SubmitButton from '../../../components/buttons/SubmitButton'

// Note: This matches the SubmitButton found in src/components/buttons/SubmitButton.tsx
// There is also another SubmitButton in src/components/SubmitButton.tsx which is slightly different (takes 'form' prop).
// This story is for the one in components/buttons/

type SubmitButtonProps = React.ComponentProps<typeof SubmitButton>

const meta: Meta<SubmitButtonProps> = {
  title: 'Components/Buttons/SubmitButton (Buttons Module)',
  component: SubmitButton,
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
}

export default meta

type Story = StoryObj<SubmitButtonProps>

export const Default: Story = {
  args: {
    children: 'Submit Request',
  },
}
