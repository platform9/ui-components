import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import Text from '../../elements/Text'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'max-content max-content',
    gap: 16,
    alignItems: 'center',
  },
  circle: {
    color: theme.components.card.passiveText,
    background: theme.components.badge.unknown.background,
    border: `1px solid ${theme.components.card.border}`,
    width: 24,
    height: 24,
    borderRadius: 12,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {},
}))

interface Props {
  step: number
  title: string
  className?: string
}

export default function NumberedStepLabel({ step, title, className }: Props) {
  const classes = useStyles({})
  return (
    <div className={clsx(classes.container, className)}>
      <Text variant="caption1" className={clsx(classes.circle, 'circle')}>
        {step}
      </Text>
      <Text variant="caption1" className={clsx(classes.title, 'title')}>
        {title}
      </Text>
    </div>
  )
}
