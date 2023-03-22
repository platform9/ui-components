import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import Text from '../elements/Text'
import clsx from 'clsx'
import generateTestId from '../utils/test-helpers'

export interface ToggleSwitchProps {
  active: boolean
  disabled?: boolean
  label?: string
  onClick: (active: boolean) => void
  className?: string
}

export default function ToggleSwitch({
  onClick,
  active = false,
  disabled = false,
  label = '',
  className = '',
}: ToggleSwitchProps) {
  const classes = useStyles({ active, disabled })

  const handleClick = useCallback(() => {
    onClick(!active)
  }, [onClick])

  return (
    <div
      data-testid={generateTestId(label, 'toggle')}
      className={clsx(classes.toggleSwitch, className)}
      onClick={!disabled ? handleClick : undefined}
      role="toggle-switch-control"
    >
      <div
        data-testid={generateTestId('toggle', 'switch')}
        className={classes.switchContainer}
        role="switch"
        aria-checked={active}
      >
        <div className={classes.switchHandle} />
        <div className={classes.switchTrack} />
      </div>
      {!!label && (
        <Text
          className={clsx(classes.switchLabel, { disabled })}
          variant="caption1"
          role="switch-label"
        >
          {label}
        </Text>
      )}
    </div>
  )
}

interface StyleProps {
  active: boolean
  disabled: boolean
}
type ToggleSwitchKeys = keyof Theme['components']['toggleSwitch']
const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  toggleSwitch: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'max-content',
    gridAutoFlow: 'column',
    gap: 8,
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
  },
  switchContainer: {
    position: 'relative',
    height: 16,
    display: 'grid',
    alignItems: 'center',
  },
  switchHandle: {
    position: 'absolute',
    borderRadius: 16,
    width: 16,
    height: 16,
    boxShadow: ({ disabled }) => (disabled ? 'unset' : '0 0 12px 0 rgba(13, 13, 40, 0.15)'),
    backgroundColor: ({ active, disabled }) => {
      const key: ToggleSwitchKeys = disabled
        ? 'disabledHandle'
        : active
        ? 'activeHandle'
        : 'inactiveHandle'
      return theme.components.toggleSwitch[key]
    },
    left: ({ active }) => (active ? 'calc(100% - 16px)' : 0),
    transition: 'left .2s ease, background-color .2s ease',
  },
  switchTrack: {
    width: 32,
    height: 12,
    borderRadius: 18,
    backgroundColor: ({ active, disabled }) => {
      const key: ToggleSwitchKeys = disabled
        ? 'disabledTrack'
        : active
        ? 'activeTrack'
        : 'inactiveTrack'
      return theme.components.toggleSwitch[key]
    },
    transition: 'background-color .2s ease',
  },
  switchLabel: {
    color: theme.components.toggleSwitch.label,
    transition: 'color .2s ease',
    '&.disabled': {
      color: theme.components.toggleSwitch.disabledLabel,
    },
    '&:not(.disabled):hover': {
      color: theme.components.toggleSwitch.hoverLabel,
    },
  },
}))
