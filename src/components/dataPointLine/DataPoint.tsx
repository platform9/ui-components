import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Text, { TextVariant } from '../../elements/Text'
import Theme from '../../theme-manager/themes/model'

interface DataPointLineProps {
  description: string | JSX.Element
  percent: number // location of where the data point is along the DataPointLine going from left to right

  className?: string
  textVariant?: TextVariant
  circleColor?: string
}

export default function DataPointLine({
  description,
  percent,
  className,
  textVariant = 'body2',
  circleColor,
}: DataPointLineProps) {
  const classes = useStyles({ percent, circleColor })
  const descriptionComponent =
    typeof description === 'string' ? (
      <Text variant={textVariant} className={classes.description}>
        {description}
      </Text>
    ) : (
      description
    )

  return (
    <div className={clsx(classes.dataPoint, className)}>
      <div className={classes.circle}></div>
      {descriptionComponent}
    </div>
  )
}

const useStyles = makeStyles<Theme, Partial<DataPointLineProps>>((theme) => ({
  dataPoint: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridGap: theme.spacing(1),
    position: 'absolute',
    left: ({ percent }) => `${percent}%`,
    top: '-5px',
  },
  circle: {
    backgroundColor: ({ circleColor }) => circleColor || theme?.palette?.primary.main,
    border: ({ circleColor }) => `2px solid ${circleColor || theme?.palette?.primary.main}`,
    borderRadius: '50%',
    width: '10px',
    height: '10px',
    position: 'relative',
  },
  description: {
    transform: 'translateX(-45%)',
  },
}))
