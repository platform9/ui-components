import React, { forwardRef } from 'react'

import Theme from '../../theme-manager/themes/model'
import clsx from 'clsx'
import { styled } from '@mui/material/styles'
import { ButtonProps } from '@mui/material'
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

const StyledButton = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  padding: '0 8px',
  borderRadius: 4,
  border: `1px solid ${(theme as any).components.iconButton.border}`,
  backgroundColor: (theme as any).components.iconButton.background,
  color: (theme as any).components.iconButton.color,
  cursor: 'pointer',
  transition: 'all .2s ease',

  '&:hover': {
    backgroundColor: (theme as any).components.iconButton.activeBackground,
    borderColor: (theme as any).components.iconButton.activeBorder,
    color: (theme as any).components.iconButton.activeColor,
  },
  '&.disabled': {
    cursor: 'not-allowed',
    backgroundColor: (theme as any).components.iconButton.disabledBackground,
    borderColor: (theme as any).components.iconButton.disabledBorder,
    color: (theme as any).components.iconButton.disabledColor,
  },
}))

const StyledIcon = styled(FontAwesomeIcon)(({ theme }) => ({
  cursor: 'pointer',
  color: 'inherit',
  fontSize: 20,
}))

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
    const content = (
      <StyledButton
        className={clsx(className, { disabled })}
        onClick={disabled ? undefined : onClick}
        ref={ref}
        {...props}
      >
        <StyledIcon size={size} solid={solid}>
          {icon || children}
        </StyledIcon>
      </StyledButton>
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
