import React, { useCallback } from 'react'
import { styled } from '@mui/material/styles'
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

interface StyledProps {
  active: boolean
  disabled: boolean
}

const StyledToggleSwitch = styled('div')<StyledProps>(({ theme, disabled }) => ({
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'max-content',
  gridAutoFlow: 'column',
  gap: 8,
  cursor: disabled ? 'not-allowed' : 'pointer',
}))

const StyledSwitchContainer = styled('div')({
  position: 'relative',
  height: 16,
  display: 'grid',
  alignItems: 'center',
})

const StyledSwitchHandle = styled('div')<StyledProps>(({ theme, active, disabled }) => {
  const key: keyof Theme['components']['toggleSwitch'] = disabled
    ? 'disabledHandle'
    : active
    ? 'activeHandle'
    : 'inactiveHandle'
  return {
    position: 'absolute',
    borderRadius: 16,
    width: 16,
    height: 16,
    boxShadow: disabled ? 'unset' : '0 0 12px 0 rgba(13, 13, 40, 0.15)',
    backgroundColor: (theme as Theme).components.toggleSwitch[key],
    left: active ? 'calc(100% - 16px)' : 0,
    transition: 'left .2s ease, background-color .2s ease',
  }
})

const StyledSwitchTrack = styled('div')<StyledProps>(({ theme, active, disabled }) => {
  const key: keyof Theme['components']['toggleSwitch'] = disabled
    ? 'disabledTrack'
    : active
    ? 'activeTrack'
    : 'inactiveTrack'
  return {
    width: 32,
    height: 12,
    borderRadius: 18,
    backgroundColor: (theme as Theme).components.toggleSwitch[key],
    transition: 'background-color .2s ease',
  }
})

const StyledSwitchLabel = styled(Text)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  color: (theme as Theme).components.toggleSwitch.label,
  transition: 'color .2s ease',
  '&.disabled': {
    color: (theme as Theme).components.toggleSwitch.disabledLabel,
  },
  '&:not(.disabled):hover': {
    color: (theme as Theme).components.toggleSwitch.hoverLabel,
  },
}))

export default function ToggleSwitch({
  onClick,
  active = false,
  disabled = false,
  label = '',
  className = '',
}: ToggleSwitchProps) {
  const handleClick = useCallback(() => {
    onClick(!active)
  }, [onClick])

  return (
    <StyledToggleSwitch
      data-testid={generateTestId(label, 'toggle')}
      className={className}
      onClick={!disabled ? handleClick : undefined}
      role="toggle-switch-control"
      disabled={disabled}
    >
      <StyledSwitchContainer
        data-testid={generateTestId('toggle', 'switch')}
        role="switch"
        aria-checked={active}
      >
        <StyledSwitchHandle active={active} disabled={disabled} />
        <StyledSwitchTrack active={active} disabled={disabled} />
      </StyledSwitchContainer>
      {!!label && (
        <StyledSwitchLabel
          className={clsx({ disabled })}
          variant="caption1"
          role="switch-label"
          disabled={disabled}
        >
          {label}
        </StyledSwitchLabel>
      )}
    </StyledToggleSwitch>
  )
}
