import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import BannerButton from '../../../components/buttons/BannerButton'

type BannerButtonProps = React.ComponentProps<typeof BannerButton>

const meta: Meta<BannerButtonProps> = {
  title: 'Components/Buttons/BannerButton',
  component: BannerButton,
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
}

export default meta

type Story = StoryObj<BannerButtonProps>

export const Default: Story = {
  args: {
    children: 'Banner Action',
  },
}
