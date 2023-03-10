import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import SemiCircleGraph from 'src/components/graphs/SemiCircleGraph'
import Text from 'src/elements/Text'
import Card from 'src/elements/card'
import CardBody from 'src/elements/card/CardBody'

const defaultStats = { current: 0, max: 0, percent: 0 }

interface Props {
  title: string
  units: string
  stats: typeof defaultStats
  precision?: number
  usedText?: string
}

export default function UsageWidget({
  title,
  precision = 1,
  units = '',
  usedText = 'used',
  stats = defaultStats,
  ...rest
}: Props) {
  const classes = useStyles({})
  const { current, max, percent } = stats

  const curStr = current.toFixed(precision) + units
  const maxStr = max.toFixed(precision) + units
  const percentage = Math.round(percent)
  const data = useMemo(
    () => [
      {
        value: percentage,
        name: '',
        color: 'fadedPrimary' as const,
      },
      {
        value: 100 - percentage,
        name: '',
        color: 'tray' as const,
      },
    ],
    [percentage],
  )
  return (
    <div>
      <Card
        className={classes.card}
        withCustomBody
        title={
          <Text className={classes.cardTitle} variant="subtitle2" component="h6">
            {title}
          </Text>
        }
      >
        <CardBody className={classes.cardBody}>
          <SemiCircleGraph data={data} percent={percent / 100} {...rest} />
          <div className={classes.container}>
            <Text variant="subtitle2" className={classes.title}>
              <b>{curStr}</b>
            </Text>{' '}
            <Text variant="body2" className={classes.modifier}>
              {usedText}
            </Text>
            <Text variant="subtitle2" className={classes.title}>
              <b>{maxStr}</b>
            </Text>{' '}
            <Text variant="body2" className={classes.modifier}>
              available
            </Text>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  title: {
    fontWeight: 300,
    textAlign: 'right',
    color: theme.components.card.text,
  },
  modifier: {
    fontWeight: 300,
    textAlign: 'left',
    color: theme.components.card.text,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: theme.spacing(0.5),
    paddingTop: 4,
  },
  card: {
    display: 'grid',
    gridTemplateRows: 'max-content max-content',
  },
  cardTitle: {
    padding: '24px 24px 0px 24px',
  },
  cardBody: {
    display: 'grid',
    justifyItems: 'center',
    paddingBottom: 32,

    '& path': {
      stroke: theme.components.graph.stroke,
    },
    '& path[name="unknown"]': {
      stroke: theme.components.graph.stroke,
      fill: theme.components.graph.tray,
    },
  },
}))
