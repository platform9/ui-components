import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { useTheme } from '@material-ui/styles'
import Text from '../../elements/Text'

interface Props {
  values: { [key: string]: string | number }[]
  xAxis: string
  dataKey: string
  lineColor?: string
  fillColor?: string
  height?: number
  legendContent?: React.ReactElement
  legendLabelFn?: (key: string) => string
  tooltipFormatterFn?: (value: string | number, key: string) => string | [string, string]
}

// To add other functionality as graphs demand
export default function SingleAreaChart({
  values,
  xAxis,
  dataKey,
  lineColor,
  fillColor,
  height = 250,
  legendLabelFn,
  tooltipFormatterFn,
}: Props) {
  const theme: any = useTheme()

  const customLegendLabel = legendLabelFn
    ? (val, entry, index) => {
        return (
          <Text variant="body2" component="span">
            {legendLabelFn(val)}
          </Text>
        )
      }
    : null

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        width={730}
        height={250}
        data={values}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={fillColor || theme?.palette?.blue?.[200]}
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor={fillColor || theme?.palette?.blue?.[200]}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey={xAxis} tick={false} />
        <YAxis tick={false} />
        <CartesianGrid vertical={false} horizontal={false} />
        <Tooltip formatter={tooltipFormatterFn} />
        <Legend
          wrapperStyle={{
            bottom: '16px',
          }}
          verticalAlign="bottom"
          iconType="plainline"
          formatter={customLegendLabel}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={lineColor || theme?.palette?.blue?.[500]}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#fillColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
