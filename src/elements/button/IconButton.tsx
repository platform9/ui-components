import React, { forwardRef } from 'react'

import Theme from '../../theme-manager/themes/model'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { ButtonProps } from '@material-ui/core'
import Tooltip, { TooltipProps } from '../../elements/tooltip/Tooltip'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import { bottomMiddle } from '../../elements/menu/defaults'

interface Props extends Omit<ButtonProps, 'variant' | 'size'> {
  disabled?: boolean
  size?: '2x' | 'md' | 'lg'
  solid?: boolean
  icon?: string
  info?: string
  tooltipProps?: Partial<TooltipProps>
}

const defaultTooltipProps = {
  ...bottomMiddle,
  origin: 'right top',
}

export default forwardRef<HTMLButtonElement, Props>(
  (
    {
      className = undefined,
      onClick,
      icon = undefined,
      info = undefined,
      children,
      disabled = false,
      size = '2x',
      solid = true,
      tooltipProps = defaultTooltipProps,
      ...props
    },
    ref,
  ) => {
    const classes = useStyles({})
    const content = (
      <button
        className={clsx(classes.button, className, { disabled })}
        onClick={disabled ? undefined : onClick}
        ref={ref}
        {...props}
      >
        <FontAwesomeIcon className={classes.icon} size={size} solid={solid}>
          {icon || children}
        </FontAwesomeIcon>
      </button>
    )
    if (!info) {
      return content
    }
    return (
      <Tooltip message={info} {...tooltipProps}>
        {content}
      </Tooltip>
    )
  },
)

/**
 *
 *
 badgeColor
 badgeTextColor
 */

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    padding: '0 8px',
    borderRadius: 4,
    border: `1px solid ${theme.components.iconButton.border}`,
    backgroundColor: theme.components.iconButton.background,
    color: theme.components.iconButton.color,
    cursor: 'pointer',
    transition: 'all .2s ease',

    '&:hover': {
      backgroundColor: theme.components.iconButton.activeBackground,
      borderColor: theme.components.iconButton.activeBorder,
      color: theme.components.iconButton.activeColor,
    },
    '&.disabled': {
      cursor: 'not-allowed',
      backgroundColor: theme.components.iconButton.disabledBackground,
      borderColor: theme.components.iconButton.disabledBorder,
      color: theme.components.iconButton.disabledColor,
    },
  },
  icon: {
    cursor: 'pointer',
    color: 'inherit',
    fontSize: 20,
  },
}))
