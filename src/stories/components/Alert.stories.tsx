import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Alert from '../../components/Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error'],
      description: 'Alert variant style',
    },
    title: {
      control: { type: 'text' },
      description: 'Alert title',
    },
    message: {
      control: { type: 'text' },
      description: 'Alert message body',
    },
    maxWidth: {
        control: { type: 'text' },
        description: 'CSS max-width value',
    }
  },
}

export default meta

type Story = StoryObj<typeof Alert>

const baseArgs = {
  title: 'Alert Title',
  message: 'This is an important alert message.',
  variant: 'primary' as const,
}

export const Default: Story = {
  args: baseArgs,
}

export const Success: Story = {
  args: {
    ...baseArgs,
    variant: 'success',
    title: 'Success!',
    message: 'Operation completed successfully.',
  },
}

export const Warning: Story = {
  args: {
    ...baseArgs,
    variant: 'warning',
    title: 'Warning',
    message: 'Please proceed with caution.',
  },
}

export const Error: Story = {
  args: {
    ...baseArgs,
    variant: 'error',
    title: 'Error',
    message: 'Something went wrong.',
  },
}

export const Gallery: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '16px' }}>
      <Alert {...args} variant="primary" title="Primary Alert" />
      <Alert {...args} variant="success" title="Success Alert" />
      <Alert {...args} variant="warning" title="Warning Alert" />
      <Alert {...args} variant="error" title="Error Alert" />
      <Alert {...args} variant="primary" title="With Children">
        <div style={{ marginTop: 8, padding: 8, background: 'rgba(255,255,255,0.5)' }}>
            Custom content children
        </div>
      </Alert>
    </div>
  ),
  args: baseArgs,
}
