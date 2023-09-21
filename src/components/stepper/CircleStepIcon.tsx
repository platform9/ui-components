import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import FontAwesomeIcon from '../FontAwesomeIcon'
import Text from '../../elements/Text'
import clsx from 'clsx'

interface StepIconProps {
  stepNumber: number
  icon?: string
  inactiveStep?: boolean
  className?: string
  color?: string
}

export default function CircleStepIcon({
  stepNumber,
  icon,
  className,
  color,
  inactiveStep = false,
}: StepIconProps) {
  const classes = useStyles({ color, inactiveStep })
  return (
    <div className={clsx(classes.circle, className)}>
      {icon ? (
        <FontAwesomeIcon className={clsx(classes.icon, 'icon')}>{icon}</FontAwesomeIcon>
      ) : (
        <Text variant="body1" className={clsx(classes.stepNumber, 'step-number')}>
          {stepNumber}
        </Text>
      )}
    </div>
  )
}

const useStyles = makeStyles<Theme, { color?: string; inactiveStep?: boolean }>((theme) => ({
  circle: {
    display: 'flex',
    height: '35px',
    width: '35px',
    backgroundColor: ({ color, inactiveStep }) =>
      color ? color : inactiveStep ? theme.palette.grey[300] : theme.palette.blue[500],
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: theme.palette.common.white,
  },
  stepNumber: {
    color: theme.palette.common.white,
  },
}))
