/* eslint-disable no-restricted-globals */
import React from 'react'
import { Meta } from '@storybook/react'
import { makeStyles } from '@material-ui/styles'
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

export const StackedChart = (args) => {
  return <StackedAreaChart values={exampleData} keys={chartKeys} xAxis={exampleAxis} responsive />
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

export const SimpleAreaChart = (args) => {
  return (
    <SingleAreaChart
      values={singleChartData}
      dataKey="price"
      xAxis="time"
      legendLabelFn={() => '30-day price history'}
      tooltipFormatterFn={(value: number, key) => {
        const dollarFormat = moneyFormatter.format(value)
        return [dollarFormat, 'Price']
      }}
    />
  )
}

StackedChart.parameters = {
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
}

StackedChart.args = {
  // size: 'large',
}

const ChartStories: Meta = {
  title: 'Elements/Chart',
  component: StackedAreaChart,
  argTypes: {
    onBeforePageChange: {
      action: 'beforePageChange',
    },
  },
}

export default ChartStories
