import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ImageWithFallback from '../../components/image-fallback'

type ImageWithFallbackProps = React.ComponentProps<typeof ImageWithFallback>

const meta: Meta<ImageWithFallbackProps> = {
  title: 'Components/ImageWithFallback',
  component: ImageWithFallback,
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Primary image source',
    },
    fallbackSrc: {
      control: { type: 'text' },
      description: 'Fallback image source',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text',
    },
  },
}

export default meta

type Story = StoryObj<ImageWithFallbackProps>

const baseArgs: ImageWithFallbackProps = {
  src: 'https://via.placeholder.com/150',
  fallbackSrc: 'https://via.placeholder.com/150/000000/FFFFFF/?text=Fallback',
  alt: 'Test Image',
  width: 150,
  height: 150,
}

export const Default: Story = {
  args: baseArgs,
}

export const FallbackTriggered: Story = {
  args: {
    ...baseArgs,
    src: 'https://invalid-url.com/non-existent.jpg',
  },
}
