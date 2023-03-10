import React from 'react'
import { PieUsageWidgetProps, PieLegend } from './PieUsageWidget'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import PieGraph from '../graphs/PieGraph'

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '& path': {
      stroke: theme.components.graph.stroke,
    },
  },
}))

export default function DonutWidget({ data, ...rest }: PieUsageWidgetProps) {
  const { container } = useStyles({})

  return (
    <div className={container}>
      <PieGraph data={data} empty={!data} {...rest} />
      <PieLegend data={data} />
    </div>
  )
}
