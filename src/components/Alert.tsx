import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'
import { styled } from '@mui/material/styles'
import Theme from '../theme-manager/themes/model'
import Text from '../elements/Text'

interface AlertProps {
  variant?: 'primary' | 'success' | 'warning' | 'error'
  title?: string | React.ReactNode
  message?: string | React.ReactNode
  id?: string
  className?: string
  maxWidth?: string
}

interface StyledAlertProps {
  variant: AlertProps['variant']
  maxWidth?: string
}

const StyledAlert = styled('article')<StyledAlertProps>(
  ({ theme, variant = 'primary', maxWidth }) => ({
    backgroundColor: (theme as Theme).components.alert[variant].background,
    maxWidth: maxWidth ?? 'unset',
    borderTop: `1px solid ${(theme as Theme).components.alert[variant].border}`,
    width: '100%',
    boxSizing: 'border-box',
    padding: 8,
    wordBreak: 'break-word',
  }),
)

const AlertTitle = styled('h5')({
  marginBottom: 10,
})

export default function Alert({
  variant = 'primary',
  title,
  message,
  id = undefined,
  className = undefined,
  children,
  maxWidth,
}: PropsWithChildren<AlertProps>) {
  const msgComponent =
    typeof message === 'string' ? <Text variant="body2">{message}</Text> : message
  return (
    <StyledAlert id={id} className={className} variant={variant} maxWidth={maxWidth}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {msgComponent}
      {children}
    </StyledAlert>
  )
}

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
