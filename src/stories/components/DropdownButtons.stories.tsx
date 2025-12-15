import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DropdownButtons from '../../components/DropdownButtons'

type DropdownButtonsProps = React.ComponentProps<typeof DropdownButtons>

const meta: Meta<DropdownButtonsProps> = {
  title: 'Components/DropdownButtons',
  component: DropdownButtons,
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Main button label',
    },
    buttons: {
      control: { type: 'object' },
      description: 'List of button actions',
    },
  },
}

export default meta

type Story = StoryObj<DropdownButtonsProps>

const baseArgs: DropdownButtonsProps = {
  label: 'Actions',
  buttons: [
    { label: 'Edit', icon: 'edit', onClick: () => console.log('Edit') },
    { label: 'Delete', icon: 'trash', onClick: () => console.log('Delete') },
    { label: 'View External', icon: 'external-link-alt', externalLink: 'https://example.com' },
    { label: 'Disabled Action', icon: 'ban', disabled: true, tooltipMsg: 'Not allowed' },
  ],
}

export const Default: Story = {
  args: baseArgs,
  decorators: [
      (Story) => (
          <div style={{ height: 250, display: 'flex', justifyContent: 'center' }}>
              <Story />
          </div>
      )
  ]
}
