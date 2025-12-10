import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import RefreshButton from '../../../components/buttons/RefreshButton'

type RefreshButtonProps = React.ComponentProps<typeof RefreshButton>

const meta: Meta<RefreshButtonProps> = {
  title: 'Components/Buttons/RefreshButton',
  component: RefreshButton,
  argTypes: {
    onRefresh: { action: 'refreshed' },
  },
}

export default meta

type Story = StoryObj<RefreshButtonProps>

export const Default: Story = {
  args: {},
}
