import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CloseButton from '../../../components/buttons/CloseButton'
import { MemoryRouter } from 'react-router-dom'

type CloseButtonProps = React.ComponentProps<typeof CloseButton>

const meta: Meta<CloseButtonProps> = {
  title: 'Components/Buttons/CloseButton',
  component: CloseButton,
  decorators: [
      (Story) => (
          <MemoryRouter>
              <Story />
          </MemoryRouter>
      )
  ],
  argTypes: {
    to: { control: 'text' },
    tooltip: { control: 'text' },
    onClick: { action: 'clicked' },
  },
}

export default meta

type Story = StoryObj<CloseButtonProps>

export const Default: Story = {
  args: {
      onClick: () => console.log('Close clicked')
  },
}

export const WithLink: Story = {
  args: {
    to: '/home',
    tooltip: 'Go to Home',
  },
}
