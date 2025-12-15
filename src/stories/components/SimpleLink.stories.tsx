import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import SimpleLink from '../../components/SimpleLink'
import { MemoryRouter } from 'react-router-dom'

type SimpleLinkProps = React.ComponentProps<typeof SimpleLink>

const meta: Meta<SimpleLinkProps> = {
  title: 'Components/SimpleLink',
  component: SimpleLink,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Link URL or path',
    },
    icon: {
      control: { type: 'text' },
      description: 'FontAwesome icon name',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error'],
      description: 'Link color variant',
    },
    textVariant: {
      control: { type: 'select' },
      options: ['body1', 'body2', 'subtitle1', 'subtitle2', 'caption1', 'caption2'],
      description: 'Typography variant',
    },
    textDecoration: {
      control: { type: 'text' },
      description: 'CSS text-decoration on hover',
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
      description: 'Icon position relative to text',
    },
    onClick: { action: 'clicked' },
  },
}

export default meta

type Story = StoryObj<SimpleLinkProps>

const baseArgs: SimpleLinkProps = {
  src: 'https://example.com',
  children: 'Example Link',
  variant: 'primary',
  textVariant: 'body2',
}

export const Default: Story = {
  args: baseArgs,
}

export const InternalLink: Story = {
  args: {
    ...baseArgs,
    src: '/dashboard',
    children: 'Go to Dashboard',
  },
}

export const WithIconLeft: Story = {
  args: {
    ...baseArgs,
    icon: 'external-link-alt',
    iconPosition: 'left',
  },
}

export const WithIconRight: Story = {
  args: {
    ...baseArgs,
    icon: 'arrow-right',
    iconPosition: 'right',
  },
}

export const ErrorVariant: Story = {
  args: {
    ...baseArgs,
    variant: 'error',
    children: 'Delete Item',
    icon: 'trash',
  },
}

export const CustomContent: Story = {
  args: {
    ...baseArgs,
    children: <strong>Bold Link</strong>,
  },
}
