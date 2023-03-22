import React, { useMemo } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { useTheme } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'

export interface PieDataEntry {
  value: number
  name: string
  color: keyof Theme['components']['graph']
}

export interface PieGraphProps {
  data: PieDataEntry[]
  width?: number
  height?: number
  sideLength?: number
  arcWidth?: number
  percent?: number
  startAngle?: number
  endAngle?: number
  primary?: string
  empty?: boolean
  healthColor?: PieDataEntry['color']
}

const PieGraph = ({
  data = [],
  sideLength = 216,
  arcWidth = 56,
  percent = undefined,
  primary,
  empty = false,
  healthColor = 'primary',
  startAngle = 0,
  endAngle = 360,
  width = sideLength + 10,
  height = sideLength + 10,
  ...rest
}: PieGraphProps) => {
  const theme: Theme = useTheme()
  const radius = Math.floor(sideLength / 2)
  const emptyData = useMemo(
    () => [{ name: 'unknown', value: 1, color: theme.components.graph.tray }],
    [theme.components.graph.tray],
  )
  const items = empty ? emptyData : data

  return (
    <PieChart width={width} height={height}>
      <Pie
        dataKey="value"
        data={items}
        startAngle={startAngle}
        endAngle={endAngle}
        cx={radius}
        cy={radius}
        innerRadius={radius - arcWidth}
        outerRadius={radius}
        paddingAngle={0}
        {...rest}
      >
        {items.map((entry) => (
          <Cell key={entry.name} fill={theme.components.graph[entry.color]} />
        ))}
      </Pie>
      {percent !== undefined && (
        <text
          style={{ ...theme.typography.h4 }}
          x={radius + 5}
          y={radius}
          fill={theme.components.card.text}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      )}
      {primary && (
        <text
          style={{ ...theme.typography.caption2 }}
          x={radius + 5}
          y={radius + 20}
          fill={theme.components.card.text}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {primary}
        </text>
      )}
    </PieChart>
  )
}

export default PieGraph
