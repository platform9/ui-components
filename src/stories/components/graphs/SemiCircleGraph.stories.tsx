import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import SemiCircleGraph from '../../../components/graphs/SemiCircleGraph'

type SemiCircleGraphProps = React.ComponentProps<typeof SemiCircleGraph>

const meta: Meta<SemiCircleGraphProps> = {
  title: 'Components/Graphs/SemiCircleGraph',
  component: SemiCircleGraph,
  argTypes: {
    sideLength: { control: 'number' },
    arcWidth: { control: 'number' },
    percent: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    primary: { control: 'text' },
    empty: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<SemiCircleGraphProps>

const data = [
    { name: 'Used', value: 70, color: 'primary' },
    { name: 'Free', value: 30, color: 'tray' },
]

const baseArgs: any = {
  data: data,
  sideLength: 300,
  percent: 0.70,
  primary: 'Used',
}

export const Default: Story = {
  args: baseArgs,
}

export const Empty: Story = {
  args: {
    ...baseArgs,
    empty: true,
    percent: undefined,
    primary: undefined,
  },
}
