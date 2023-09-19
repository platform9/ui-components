import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Theme from '../../theme-manager/themes/model'
import clsx from 'clsx'
import Text, { TextVariant } from '../../elements/Text'

export interface StepProps {
  label: string
  stepIcon: JSX.Element
  content?: string | JSX.Element
  isLastStep?: boolean

  // Customizations
  className?: string
  lineColor?: string
  labelTextVariant?: TextVariant
}

export default function Step({
  label,
  content,
  stepIcon,
  isLastStep,
  className,
  lineColor,
  labelTextVariant = 'body2',
}: StepProps) {
  const classes = useStyles({ lineColor })

  return (
    <div className={clsx(classes.step, className)}>
      <div className={clsx(classes.stepper, 'stepper')}>
        {stepIcon}
        {!isLastStep && <div className={clsx(classes.line, 'line')} />}
      </div>
      <div className={clsx(classes.info, 'info')}>
        <Text variant="h3" className={clsx(classes.label, 'label')}>
          {label}
        </Text>
        {typeof content === 'string' ? <Text variant={labelTextVariant}>{content}</Text> : content}
      </div>
    </div>
  )
}

const useStyles = makeStyles<Theme, { lineColor?: string }>((theme) => ({
  step: {
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
    gridGap: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  stepper: {
    display: 'grid',
    gridTemplateColumns: 'max-content',
    justifyItems: 'center',
    gridTemplateRows: 'max-content',
    gridGap: theme.spacing(1),
  },
  line: {
    minHeight: '50px',
    height: '100%',
    borderLeft: ({ lineColor }) => `1px solid ${lineColor || theme.palette.grey[300]}`,
  },
  info: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridGap: theme.spacing(1),
  },
}))
