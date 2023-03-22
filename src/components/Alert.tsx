import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import Text from '../elements/Text'

interface AlertProps {
  variant?: 'primary' | 'success' | 'warning' | 'error'
  title?: string
  message?: string | React.ReactNode
  id?: string
  className?: string
  maxWidth?: string
}

export default function Alert({
  variant = 'primary',
  title,
  message,
  id = undefined,
  className = undefined,
  children,
  maxWidth,
}: PropsWithChildren<AlertProps>) {
  const classes = useStyles({ variant, maxWidth })
  const msgComponent =
    typeof message === 'string' ? <Text variant="body2">{message}</Text> : message
  return (
    <article id={id} className={clsx(classes.alert, className)}>
      {title && (
        <Text className={classes.alertTitle} variant="caption1" component="h5">
          {title}
        </Text>
      )}
      {msgComponent}
      {children}
    </article>
  )
}

const useStyles = makeStyles<Theme, Partial<AlertProps>>((theme) => ({
  alert: {
    backgroundColor: ({ variant }) => theme.components.alert[variant].background,
    width: '100%',
    maxWidth: ({ maxWidth }) => (maxWidth ? maxWidth : 'unset'),
    boxSizing: 'border-box',
    padding: 8,
    borderTop: ({ variant }) => `1px solid ${theme.components.alert[variant].border}`,
    wordBreak: 'break-word',
  },
  alertTitle: {
    marginBottom: 10,
  },
}))

/*
@todo check with design if we want to use icons in the alert

export const variantIcon = {
  success: 'check-circle',
  warning: 'exclamation-circle',
  error: 'exclamation-circle',
  info: 'info-circle',
}
<FontAwesomeIcon className={classes.icon}>
  {variantIcon[variant]}
</FontAwesomeIcon>
*/
