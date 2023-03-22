import React from 'react'
import PieGraph, { PieDataEntry } from '../../components/graphs/PieGraph'
import { makeStyles, useTheme } from '@material-ui/styles'

import Text from '../../elements/Text'
import { formattedName } from '../../utils/formatters'
import Theme from '../../theme-manager/themes/model'
import Tooltip from '../../elements/tooltip'
import clsx from 'clsx'

export interface PieUsageWidgetProps {
  primary?: string
  sideLength?: number
  arcWidth?: number
  data: PieDataEntry[]
  className?: string
  showPercent?: boolean
}

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',

    '& path': {
      stroke: theme.components.graph.stroke,
    },
    '& path[name="unknown"]': {
      stroke: theme.components.graph.stroke,
      fill: theme.components.graph.tray,
    },
  },
  pieLegend: {
    display: 'grid',
    gridTemplateRows: 'repeat(auto-fill, 20px)',
    gap: theme.spacing(),
    alignContent: 'center',
    justifyItems: 'start',
    maxWidth: 135,
  },
  legendName: {
    color: theme.components.card.text,
    whiteSpace: 'nowrap',
  },
  legendCount: {
    justifySelf: 'end', // for when there are large and small counts
    color: theme.palette.grey[700],
    textShadow: '1px 1px rgba(0,0,0,0.1)',
    padding: '0px 5px 2px',
    borderRadius: 16,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 16,
    minWidth: 8,
  },
  legendRow: {
    display: 'inline-grid',
    gridTemplateColumns: 'minmax(min-content, 36px) 1fr',
    gap: theme.spacing(),
  },
}))

export const PieLegend = ({ data }) => {
  const theme: Theme = useTheme()
  const classes = useStyles({})
  const { pieLegend, legendName } = useStyles({})

  return (
    <legend className={clsx(pieLegend, 'pieLegend')}>
      {data &&
        data.map((entry) => (
          <div key={entry.name} className={classes.legendRow}>
            <Text
              component="span"
              variant="caption2"
              className={classes.legendCount}
              style={{ backgroundColor: theme.components.graph[entry.color] }}
            >
              {entry.value}
            </Text>
            {entry.info ? (
              <Tooltip message={entry.info}>
                <Text component="span" variant="caption2" className={legendName}>
                  {formattedName(entry.name)}
                </Text>
              </Tooltip>
            ) : (
              <Text component="span" variant="caption2" className={legendName}>
                {formattedName(entry.name)}
              </Text>
            )}
          </div>
        ))}
    </legend>
  )
}

const PieUsageWidget = ({
  primary,
  data,
  className,
  showPercent = true,
  ...rest
}: PieUsageWidgetProps) => {
  const { container } = useStyles({})

  if (!data) {
    return null
  }
  const total = data.reduce((acc, cur) => acc + cur.value, 0)
  const isEmpty = !total
  const primaryObj = data.find((x) => x.name === primary)
  const primaryNum = primaryObj?.value
  const percent = primaryNum / total || 0
  const healthColorKey = isEmpty
    ? 'default'
    : percent < 0.25
    ? 'error'
    : percent < 0.5
    ? 'danger'
    : percent < 0.75
    ? 'warning'
    : 'success'

  return (
    <div className={clsx(container, className)}>
      <PieGraph
        data={data}
        percent={showPercent ? percent : undefined}
        healthColor={healthColorKey}
        primary={primary}
        empty={isEmpty}
        {...rest}
      />
      <PieLegend data={data} />
    </div>
  )
}

export default PieUsageWidget
