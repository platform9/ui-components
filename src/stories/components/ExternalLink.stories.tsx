import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ExternalLink from '../../components/ExternalLink'

type ExternalLinkProps = React.ComponentProps<typeof ExternalLink>

const meta: Meta<ExternalLinkProps> = {
  title: 'Components/ExternalLink',
  component: ExternalLink,
  argTypes: {
    url: {
      control: { type: 'text' },
      description: 'Target URL',
    },
    newWindow: {
      control: { type: 'boolean' },
      description: 'Open in new window',
    },
    children: {
      control: { type: 'text' },
      description: 'Link text/content',
    },
  },
}

export default meta

type Story = StoryObj<ExternalLinkProps>

const baseArgs: ExternalLinkProps = {
  url: 'https://www.platform9.com',
  children: 'Visit Platform9',
}

export const Default: Story = {
  args: baseArgs,
}

export const CustomContent: Story = {
  args: {
    ...baseArgs,
    children: <strong>Bold Link Text</strong>,
  },
}
