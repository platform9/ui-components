import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import PresetField from '../../components/PresetField'

type PresetFieldProps = React.ComponentProps<typeof PresetField>

const meta: Meta<PresetFieldProps> = {
  title: 'Components/PresetField',
  component: PresetField,
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Field label',
    },
    value: {
      control: { type: 'text' },
      description: 'Field value',
    },
  },
}

export default meta

type Story = StoryObj<PresetFieldProps>

const baseArgs: PresetFieldProps = {
  label: 'Cluster Name',
  value: 'production-cluster-1',
}

export const Default: Story = {
  args: baseArgs,
}
