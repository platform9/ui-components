import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Progress from '../../../components/progress/Progress'
import Text from '../../../elements/Text'
import Button from '../../../elements/button'
import { LoadingGifs } from '../../../constants'

type ProgressProps = React.ComponentProps<typeof Progress>

const meta: Meta<ProgressProps> = {
  title: 'Components/Progress/Progress',
  component: Progress,
  argTypes: {
    loading: { control: 'boolean' },
    overlay: { control: 'boolean' },
    inline: { control: 'boolean' },
    message: { control: 'text' },
    loadingImageHeight: { control: 'number' },
    renderContentOnMount: { control: 'boolean' },
    renderLoadingImage: { control: 'boolean' },
    loadingImage: {
      control: { type: 'select' },
      options: Object.values(LoadingGifs),
    },
  },
}

export default meta

type Story = StoryObj<ProgressProps>

const baseArgs: ProgressProps = {
  loading: true,
  message: 'Loading Data...',
}

const Content = () => (
    <div style={{ padding: 20, border: '1px solid #ccc', borderRadius: 4 }}>
        <Text variant="subtitle2">Content Title</Text>
        <Text variant="body1">This is the content that is being protected by the progress loader.</Text>
        <div style={{ marginTop: 10 }}>
            <Button>Action</Button>
        </div>
    </div>
)

export const Default: Story = {
  args: baseArgs,
  render: (args) => (
      <Progress {...args}>
          <Content />
      </Progress>
  )
}

export const Overlay: Story = {
  args: {
    ...baseArgs,
    overlay: true,
  },
  render: (args) => (
      <Progress {...args}>
          <Content />
      </Progress>
  )
}

export const Inline: Story = {
  args: {
    ...baseArgs,
    inline: true,
    message: 'Saving...',
  },
  render: (args) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text variant="body1" style={{ marginRight: 10 }}>Status:</Text>
          <Progress {...args} />
      </div>
  )
}

export const NoImage: Story = {
  args: {
    ...baseArgs,
    renderLoadingImage: false,
    message: 'Just Text Loading...',
  },
  render: (args) => (
      <Progress {...args}>
          <Content />
      </Progress>
  )
}
