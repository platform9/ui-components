import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import HelpContainer from '../../components/HelpContainer'

type HelpContainerProps = React.ComponentProps<typeof HelpContainer>

const meta: Meta<HelpContainerProps> = {
  title: 'Components/HelpContainer',
  component: HelpContainer,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Tooltip text',
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon name',
    },
    color: {
      control: { type: 'radio' },
      options: ['white', 'black'],
      description: 'Icon color',
    },
    link: {
      control: { type: 'text' },
      description: 'Optional link URL',
    },
  },
}

export default meta

type Story = StoryObj<HelpContainerProps>

const baseArgs: HelpContainerProps = {
  title: 'This is some helpful information.',
  icon: 'question-circle',
  color: 'black',
}

export const Default: Story = {
  args: baseArgs,
}

export const WithLink: Story = {
  args: {
    ...baseArgs,
    link: 'https://example.com',
    title: 'Click for more help',
  },
}

export const CustomIcon: Story = {
  args: {
    ...baseArgs,
    icon: 'info-circle',
  },
}
