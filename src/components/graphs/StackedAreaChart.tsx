import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { makeStyles, useTheme } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
// import { useTheme } from '@material-ui/styles'
import { pathStr } from '../../utils/fp'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../theme-manager/selector'

const useStyles = makeStyles((theme: Theme) => ({
  chartContainer: {
    '& g.recharts-cartesian-grid-horizontal > line:last-child': {
      display: 'none',
    },
  },
}))
/*
  Usage:
  type IRequiredAreaChartTypes = 'warning' | 'critical' | 'fatal'

  const exampleData = [
    {
      time: '8:00',
      warning: 5,
      critical: 10,
      fatal: 15,
    },
    ...
  ]

  const exampleTypes = [
    {
      name: 'warning',
      color: 'warning',
    },
    ...
  ]

  const exampleAxis = 'time'

  <StackedAreaChart<'time', IRequiredAreaChartTypes>
    values={exampleData}
    keys={exampleTypes}
    xAxis="time"
  />

*/

type AreaChartEntry<T extends string, V extends string> = { [P in T | V]: any }

export interface AreaChartType<T> {
  name: T
  color: string
  icon?: string
}

// types should be a list of strings that also show up in AreaChartEntry as a property
interface Props<T extends string, V extends string> {
  values: Array<AreaChartEntry<T, V>>
  width?: number
  height?: number
  xAxis: T
  keys: Array<AreaChartType<V>>
  responsive?: boolean
  responsiveHeight?: number
  verticalAxisLines?: boolean
  horizontalAxisLines?: boolean
  CustomTooltip?: JSX.Element
}

// Todo: Instead of a set width and height, also allow for percents
function StackedAreaChart<Axis extends string, Types extends string>({
  values,
  width = 600,
  height = 400,
  keys,
  xAxis,
  verticalAxisLines = false,
  horizontalAxisLines = true,
  responsive = false,
  responsiveHeight = 250,
  CustomTooltip = undefined,
}: Props<Axis, Types>) {
  // old theme to access palette
  const theme: any = useTheme()
  // const themeStore = useSelector(prop<string, ThemeReducer>('theme'))
  const themeStore = useSelector(themeSelector)
  const classes = useStyles({})

  const renderAreaChart = () => {
    return (
      // Note: this doesn't render anything w/o ResponsiveContainer bc width/height are required
      <AreaChart data={values} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid
          vertical={verticalAxisLines}
          horizontal={horizontalAxisLines}
          // strokeDasharray="2 3"
          stroke={themeStore?.components?.table?.border} /* dot={{strokeWidth: 4}} */
        />
        <XAxis
          axisLine={{ stroke: themeStore?.components?.table?.border, strokeWidth: 1 }}
          tick={false}
          dataKey={xAxis}
          allowDataOverflow
        />
        <YAxis
          padding={{
            top: 20,
          }}
          axisLine={{ stroke: themeStore?.components?.table?.border, strokeWidth: 1 }}
          tickLine={{
            stroke: themeStore?.components?.table?.border,
            strokeWidth: 1,
          }}
          tick={{
            fontSize: 14,
            fill: themeStore?.components?.table?.headColor,
            style: { transform: 'translate(-12px, 0px)' },
          }}
          tickSize={8}
          allowDataOverflow
        />
        <Tooltip
          cursor={{ stroke: 'rgba(96, 96, 96, 0.5)', strokeDasharray: '6' /* strokeWidth: 6 */ }}
          content={CustomTooltip}
        />
        {keys.map(({ name, color }) => (
          <Area
            key={name}
            type="monotone"
            dataKey={name}
            stackId="1"
            stroke={pathStr(color, theme.palette)}
            strokeWidth={2}
            fill={pathStr(color, theme.palette)}
            activeDot={{ strokeWidth: 4, r: 8, stroke: 'rgba(96, 96, 96, 0.5)' }}
          />
        ))}
      </AreaChart>
    )
  }

  return responsive ? (
    <ResponsiveContainer width="100%" height={responsiveHeight} className={classes.chartContainer}>
      {renderAreaChart()}
    </ResponsiveContainer>
  ) : (
    <>
      {/* <div className={classes.chartContainer}>{renderAreaChart()}</div> */}
      <AreaChart
        width={750}
        height={250}
        data={values}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          vertical={verticalAxisLines}
          horizontal={horizontalAxisLines}
          // strokeDasharray="2 3"
          stroke={themeStore?.components?.table?.border} /* dot={{strokeWidth: 4}} */
        />
        <XAxis
          axisLine={{ stroke: themeStore?.components?.table?.border, strokeWidth: 1 }}
          tick={false}
          dataKey={xAxis}
          allowDataOverflow
        />
        <YAxis
          padding={{
            top: 20,
          }}
          axisLine={{ stroke: themeStore?.components?.table?.border, strokeWidth: 1 }}
          tickLine={{
            stroke: themeStore?.components?.table?.border,
            strokeWidth: 1,
          }}
          tick={{
            fontSize: 14,
            fill: themeStore?.components?.table?.headColor,
            style: { transform: 'translate(-12px, 0px)' },
          }}
          tickSize={8}
          allowDataOverflow
        />
        <Tooltip
          cursor={{ stroke: 'rgba(96, 96, 96, 0.5)', strokeDasharray: '6' /* strokeWidth: 6 */ }}
          content={CustomTooltip}
        />
        {keys.map(({ name, color }) => (
          <Area
            key={name}
            type="monotone"
            dataKey={name}
            stackId="1"
            stroke={pathStr(color, theme.palette)}
            strokeWidth={2}
            fill={pathStr(color, theme.palette)}
            activeDot={{ strokeWidth: 4, r: 8, stroke: 'rgba(96, 96, 96, 0.5)' }}
          />
        ))}
      </AreaChart>
    </>
  )
}

export default StackedAreaChart
