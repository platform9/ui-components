/* eslint-disable no-restricted-globals */
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { makeStyles } from '@mui/styles'
import Theme from '../../theme-manager/themes/model'
import StackedAreaChart from 'src/components/graphs/StackedAreaChart'
import SingleAreaChart from 'src/components/graphs/SingleAreaChart'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  expandedRow: {
    padding: '32px',
    display: 'grid',
    gap: '16px',
  },
}))

const exampleData = [
  {
    time: '8:00 PM',
    warning: 5,
    critical: 10,
    fatal: 0,
  },
  {
    time: '9:00 PM',
    warning: 2,
    critical: 8,
    fatal: 3,
  },
  {
    time: '10:00 PM',
    warning: 2,
    critical: 9,
    fatal: 5,
  },
  {
    time: '11:00 PM',
    warning: 10,
    critical: 2,
    fatal: 4,
  },
  {
    time: '12:00 PM',
    warning: 8,
    critical: 9,
    fatal: 8,
  },
  {
    time: '1:00 AM',
    warning: 2,
    critical: 2,
    fatal: 15,
  },
]

const chartKeys = [
  {
    name: 'warning',
    color: 'yellow.200',
    // badge: 'warning' as const,
    icon: 'exclamation-triangle',
  },
  {
    name: 'critical',
    color: 'yellow.300',
    // badge: 'danger' as const,
    icon: 'engine-warning',
  },
  {
    name: 'fatal',
    color: 'red.300',
    // badge: 'error' as const,
    icon: 'skull-crossbones',
  },
]

const exampleAxis = 'time'

const meta: Meta<typeof StackedAreaChart> = {
  title: 'Elements/Chart',
  component: StackedAreaChart,
  argTypes: {
    responsive: {
      control: { type: 'boolean' },
      description: 'Whether the chart should expand to fill its container width',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    verticalAxisLines: {
      control: { type: 'boolean' },
      description: 'Toggles vertical grid lines',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    horizontalAxisLines: {
      control: { type: 'boolean' },
      description: 'Toggles horizontal grid lines',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof StackedAreaChart>

const baseArgs = {
  values: exampleData,
  keys: chartKeys,
  xAxis: exampleAxis,
  responsive: true,
}

export const StackedChart: Story = {
  args: {
    ...baseArgs,
  },
  parameters: {
    docs: {
      source: {
        code: `
  import StackedAreaChart from 'core/components/graphs/StackedAreaChart'

  const AreaChart = () => (
    <StackedAreaChart<'time', IRequiredAreaChartTypes>
      values={exampleData}
      keys={chartKeys}
      xAxis="time"
    />
  )
`,
      },
    },
  },
}

const singleChartData = [
  {
    time: '8:00 PM',
    price: 0.27,
  },
  {
    time: '9:00 PM',
    price: 0.85,
  },
  {
    time: '10:00 PM',
    price: 1.37,
  },
  {
    time: '11:00 PM',
    price: 1.39,
  },
  {
    time: '12:00 PM',
    price: 0.88,
  },
  {
    time: '1:00 AM',
    price: 1.05,
  },
]

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const SimpleAreaChart: Story = {
  render: () => (
    <SingleAreaChart
      values={singleChartData}
      dataKey="price"
      xAxis="time"
      legendLabelFn={() => '30-day price history'}
      tooltipFormatterFn={(value: number) => {
        const dollarFormat = moneyFormatter.format(value)
        return [dollarFormat, 'Price']
      }}
    />
  ),
}
