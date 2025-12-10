import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DataPoint from '../../../components/dataPointLine/DataPoint'
import Text from '../../../elements/Text'

type DataPointProps = React.ComponentProps<typeof DataPoint>

const meta: Meta<DataPointProps> = {
  title: 'Components/DataPointLine/DataPoint',
  component: DataPoint,
  argTypes: {
    description: { control: 'text' },
    percent: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Position percent (0-100)',
    },
    circleColor: { control: 'color' },
    textVariant: {
      control: { type: 'select' },
      options: ['body1', 'body2', 'caption1', 'caption2'],
    },
  },
}

export default meta

type Story = StoryObj<DataPointProps>

const baseArgs: DataPointProps = {
  description: 'Milestone 1',
  percent: 50,
}

// DataPoint uses absolute positioning based on percentage, so it needs a relative container
const Wrapper = (args: DataPointProps) => (
    <div style={{ position: 'relative', width: '100%', height: 100, border: '1px dashed #ccc', marginTop: 20 }}>
        <DataPoint {...args} />
    </div>
)

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />
}

export const CustomColor: Story = {
  args: {
    ...baseArgs,
    description: 'Critical Event',
    circleColor: 'red',
    percent: 75,
  },
  render: (args) => <Wrapper {...args} />
}

export const CustomDescription: Story = {
  args: {
    ...baseArgs,
    description: <Text variant="caption1" style={{ fontWeight: 'bold' }}>Custom JSX</Text>,
    percent: 25,
  },
  render: (args) => <Wrapper {...args} />
}
