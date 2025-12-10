import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DataPointLine from '../../../components/dataPointLine/DataPointLine'
import DataPoint from '../../../components/dataPointLine/DataPoint'

type DataPointLineProps = React.ComponentProps<typeof DataPointLine>

const meta: Meta<DataPointLineProps> = {
  title: 'Components/DataPointLine/DataPointLine',
  component: DataPointLine,
  argTypes: {
    lineColor: { control: 'color' },
    arrowColor: { control: 'color' },
  },
}

export default meta

type Story = StoryObj<DataPointLineProps>

const baseArgs: DataPointLineProps = {
  children: null,
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => (
      <DataPointLine {...args}>
          <DataPoint percent={0} description="Start" />
          <DataPoint percent={50} description="Middle" />
          <DataPoint percent={100} description="End" />
      </DataPointLine>
  )
}

export const CustomColors: Story = {
  args: {
      lineColor: 'blue',
      arrowColor: 'blue',
  },
  render: (args) => (
      <DataPointLine {...args}>
          <DataPoint percent={20} description="Step 1" circleColor="blue" />
          <DataPoint percent={80} description="Step 2" circleColor="blue" />
      </DataPointLine>
  )
}
