import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DataPointLine from '../../components/dataPointLine/DataPointLine'
import DataPoint from '../../components/dataPointLine/DataPoint'

const gradientLineColor = 'linear-gradient(to right, red, orange, yellow, green)'

const meta: Meta<typeof DataPointLine> = {
  title: 'Elements/DataPointLine',
  component: DataPointLine,
  argTypes: {
    lineColor: {
      control: { type: 'text' },
      description: 'CSS color or gradient used for the line background',
      table: {
        type: { summary: 'string' },
      },
    },
    arrowColor: {
      control: { type: 'text' },
      description: 'Color of the arrow at the end of the line',
      table: {
        type: { summary: 'string' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof DataPointLine>

const baseArgs = {
  lineColor: gradientLineColor,
  arrowColor: 'green',
}

export const Gradient: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <DataPointLine {...args}>
      <DataPoint description="0%" percent={0} circleColor="red" />
      <DataPoint description="20%" percent={20} circleColor="#ff6400" />
      <DataPoint description="50%" percent={50} circleColor="#ffd700" />
      <DataPoint description="80%" percent={80} circleColor="#73b500" />
    </DataPointLine>
  ),
}

export const SolidColor: Story = {
  args: {
    lineColor: '#00abe8',
    arrowColor: '#00abe8',
  },
  render: (args) => (
    <DataPointLine {...args}>
      <DataPoint description="0%" percent={0} circleColor="#00abe8" />
      <DataPoint description="50%" percent={50} circleColor="#00abe8" />
      <DataPoint description="100%" percent={100} circleColor="#00abe8" />
    </DataPointLine>
  ),
}

export const Gallery: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <DataPointLine {...args}>
        <DataPoint description="0%" percent={0} circleColor="red" />
        <DataPoint description="20%" percent={20} circleColor="#ff6400" />
        <DataPoint description="50%" percent={50} circleColor="#ffd700" />
        <DataPoint description="80%" percent={80} circleColor="#73b500" />
      </DataPointLine>
      <DataPointLine lineColor="#333" arrowColor="#333">
        <DataPoint description="Start" percent={0} circleColor="#333" />
        <DataPoint description="Middle" percent={50} circleColor="#333" />
        <DataPoint description="End" percent={100} circleColor="#333" />
      </DataPointLine>
    </div>
  ),
}
