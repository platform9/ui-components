/* eslint-disable no-restricted-globals */
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stepper from '../../components/stepper/Stepper'

const steps = [
  {
    label: 'Select campaign settings',
    content: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    content: 'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    content: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
]

const meta: Meta<typeof Stepper> = {
  title: 'Elements/Stepper',
  component: Stepper,
  argTypes: {
    activeStep: {
      control: { type: 'number' },
      description: '1-based index of the active step',
      table: {
        defaultValue: { summary: 1 },
        type: { summary: 'number' },
      },
    },
    steps: {
      control: { type: 'object' },
      description: 'Configuration for each step (label, content, optional custom icon)',
      table: {
        type: { summary: 'Array<{ label: string; content?: string | JSX.Element }>' },
      },
    },
    lineColor: {
      control: { type: 'color' },
      description: 'Overrides the color of the vertical connector line between steps',
    },
  },
}

export default meta

type Story = StoryObj<typeof Stepper>

const baseArgs = {
  activeStep: 2,
  steps,
}

export const Default: Story = {
  args: {
    ...baseArgs,
  },
}

export const FirstStep: Story = {
  args: {
    ...baseArgs,
    activeStep: 1,
  },
}

export const CustomLineColor: Story = {
  args: {
    ...baseArgs,
    lineColor: '#00abe8',
  },
}

export const CustomLabelVariant: Story = {
  args: {
    ...baseArgs,
    activeStep: 3,
    labelTextVariant: 'caption1',
  },
}

export const Gallery: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Stepper {...args} activeStep={1} steps={steps} />
      <Stepper {...args} activeStep={2} steps={steps} />
      <Stepper {...args} activeStep={3} steps={steps} />
    </div>
  ),
}
