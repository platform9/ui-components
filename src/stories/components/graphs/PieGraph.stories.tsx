import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import PieGraph from '../../../components/graphs/PieGraph'

type PieGraphProps = React.ComponentProps<typeof PieGraph>

const meta: Meta<PieGraphProps> = {
  title: 'Components/Graphs/PieGraph',
  component: PieGraph,
  argTypes: {
    sideLength: { control: 'number' },
    arcWidth: { control: 'number' },
    startAngle: { control: 'number' },
    endAngle: { control: 'number' },
    percent: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    primary: { control: 'text' },
    empty: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<PieGraphProps>

const data = [
    { name: 'Group A', value: 400, color: 'primary' },
    { name: 'Group B', value: 300, color: 'secondary' },
    { name: 'Group C', value: 300, color: 'faded' },
    { name: 'Group D', value: 200, color: 'error' },
]

const baseArgs: any = {
  data: data,
  sideLength: 300,
}

export const Default: Story = {
  args: baseArgs,
}

export const WithCenterText: Story = {
  args: {
    ...baseArgs,
    percent: 0.75,
    primary: 'Usage',
  },
}

export const Empty: Story = {
  args: {
    ...baseArgs,
    empty: true,
  },
}

export const Donut: Story = {
    args: {
        ...baseArgs,
        arcWidth: 30, // Thinner ring
    }
}
