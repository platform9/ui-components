import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../../theme-manager/themes/model'
import Button from '../../../elements/button'
import { BatchActionButtonProps } from '../../../elements/grid/hooks/useGridSelectableRows'
import { ButtonProps } from '../../../elements/button/Button'
import Tooltip from '../../../elements/tooltip'
import { topMiddle } from '../../../elements/menu/defaults'
import clsx from 'clsx'

export type GridDefaultActionButtonProps<T> = ButtonProps & BatchActionButtonProps<T>

export default function GridDefaultActionButton<T>({
  className,
  disabled,
  children,
  onClick,
  icon,
  solidIcon = true,
  tooltip,
  ...rest
}: GridDefaultActionButtonProps<T>) {
  const classes = useStyles({ disabled })
  const button = (
    <Button
      {...rest}
      className={clsx(classes.btn, className)}
      icon={icon}
      variant="secondary"
      disabled={disabled}
      onClick={onClick}
      solidIcon={solidIcon}
    >
      {children}
    </Button>
  )
  if (tooltip) {
    return (
      <Tooltip message={tooltip} align={topMiddle.align} offset={topMiddle.offset}>
        {button}
      </Tooltip>
    )
  }
  return button
}

const useStyles = makeStyles<Theme, { disabled: boolean }>((theme) => ({
  btn: {
    opacity: ({ disabled = false }) => (disabled ? 0.5 : 1),
    '& > .button-text > .button-icon': {
      fontWeight: 'normal',
      fontSize: 12,
    },
    '& > .button-text': {
      fontWeight: 'normal',
    },
    '&:hover > .button-text': {
      fontWeight: 'normal',
    },
  },
}))
