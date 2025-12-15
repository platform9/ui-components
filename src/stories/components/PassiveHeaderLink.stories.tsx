import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import PassiveHeaderLink from '../../components/passive-header-link'
import { MemoryRouter } from 'react-router-dom'

type PassiveHeaderLinkProps = React.ComponentProps<typeof PassiveHeaderLink>

const meta: Meta<PassiveHeaderLinkProps> = {
  title: 'Components/PassiveHeaderLink',
  component: PassiveHeaderLink,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'Link text',
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon name',
    },
    url: {
      control: { type: 'text' },
      description: 'Link URL',
    },
    onClick: { action: 'clicked' },
  },
}

export default meta

type Story = StoryObj<PassiveHeaderLinkProps>

const baseArgs: PassiveHeaderLinkProps = {
  text: 'Documentation',
  icon: 'book',
  url: '/docs',
}

export const Default: Story = {
  args: baseArgs,
}

export const WithClickHandler: Story = {
  args: {
    ...baseArgs,
    url: undefined,
    onClick: () => console.log('Clicked'),
  },
}
