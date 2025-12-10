import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DropdownButton from '../../components/DropdownButton'

type DropdownButtonProps = React.ComponentProps<typeof DropdownButton>

const meta: Meta<DropdownButtonProps> = {
  title: 'Components/DropdownButton',
  component: DropdownButton,
  argTypes: {
    addText: {
      control: { type: 'text' },
      description: 'Button label',
    },
    links: {
      control: { type: 'object' },
      description: 'List of links',
    },
  },
}

export default meta

type Story = StoryObj<DropdownButtonProps>

const baseArgs: DropdownButtonProps = {
  addText: 'Options',
  links: [
    { label: 'Profile', link: '/profile' },
    { label: 'Settings', link: '/settings' },
    { label: 'Logout', link: '/logout' },
  ],
}

export const Default: Story = {
  args: baseArgs,
  decorators: [
      (Story) => (
          <div style={{ height: 200, display: 'flex', justifyContent: 'center' }}>
              <Story />
          </div>
      )
  ]
}
