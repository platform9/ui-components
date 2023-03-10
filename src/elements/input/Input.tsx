import React, { PropsWithChildren, useRef, useMemo, useCallback, ReactNode } from 'react'
import FontAwesomeIcon from 'src/components/FontAwesomeIcon'
import { mergeRight } from 'ramda'
import Text from '../Text'
import Theme from 'src/theme-manager/themes/model'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Tooltip from 'src/elements/tooltip'
import { topMiddle } from 'src/elements/menu/defaults'
import useToggler from 'src/hooks/useToggler'

export interface InputIconProps {
  onClick?: () => void
  placement?: 'start' | 'end'
}

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string
  compact?: boolean
  variant?: 'light' | 'dark'
  mask?: string
  iconProps?: InputIconProps
  icon?: string
  label?: string
  info?: string | ReactNode
  disabled?: boolean
  error?: string
  onChange?: (e: any) => void
}

const defaultIconProps: InputIconProps = {
  placement: 'start',
}

const Input = ({
  className = undefined,
  compact = false,
  variant = 'light',
  mask = undefined,
  icon = undefined,
  iconProps = undefined,
  placeholder = '',
  label = '',
  info = '',
  children,
  value,
  onChange,
  disabled = false,
  error = '',
  ...rest
}: PropsWithChildren<InputProps>) => {
  const maskRef = useRef<HTMLParagraphElement>()
  const width = useMemo(() => {
    return maskRef?.current?.getBoundingClientRect()?.width || 0
  }, [maskRef.current, mask])

  const [focused, toggleFocused] = useToggler(false)
  const allIconProps = useMemo(() => mergeRight(defaultIconProps, iconProps || {}), [iconProps])
  const handleChange = useCallback(
    (event) => {
      if (onChange) {
        onChange(event)
      }
    },
    [onChange],
  )

  const handleFocusOut = (event) => {
    event.target.value = event?.target?.value?.trim()
    onChange(event)
    toggleFocused()
  }

  const handleFocusToggle = useCallback(() => {
    toggleFocused()
  }, [toggleFocused])
  const classes = useStyles({
    compact,
    variant,
    width,
    icon,
    disabled,
    error,
    focused,
    placement: allIconProps.placement,
    info: !!info,
  })
  let extraContent = null
  if (mask && !!value) {
    extraContent = (
      <Text variant="inputPlaceholder" ref={maskRef} className={classes.maskText}>
        {mask}
      </Text>
    )
  }
  return (
    <div className={clsx(classes.wrapper, className)}>
      {label && (
        <Text variant="inputLabel" className={clsx(classes.label, 'label')}>
          {label}
        </Text>
      )}
      {info && (
        <Tooltip
          message={info || label || placeholder}
          align={topMiddle.align}
          offset={topMiddle.offset}
          origin="right center"
          className={classes.info}
        >
          <Text variant="inputLabel" className={classes.hint}>
            <FontAwesomeIcon>question-circle</FontAwesomeIcon>
            Hint
          </Text>
        </Tooltip>
      )}

      <div className={clsx(classes.inputFrame, 'inputFrame')}>
        {icon && (
          <FontAwesomeIcon className={clsx(classes.icon, 'icon')} onClick={allIconProps.onClick}>
            {icon}
          </FontAwesomeIcon>
        )}
        {extraContent}
        <input
          {...rest}
          onFocus={handleFocusToggle}
          onBlur={handleFocusOut}
          value={value}
          onChange={handleChange}
          placeholder={placeholder || label}
          className={clsx(classes.input, 'input', {
            'input-disabled': disabled,
          })}
        >
          {children}
        </input>
      </div>
      {!!error && (
        <Text variant="body2" className={classes.error}>
          {error}
        </Text>
      )}
    </div>
  )
}

interface StyleProps {
  icon?: string
  compact: boolean
  variant: string
  width: number
  disabled: boolean
  focused: boolean
  error: string
  info: boolean
  placement: InputIconProps['placement']
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  wrapper: {
    display: 'grid',
    maxWidth: 400,
    minWidth: 100,
    width: '100%',
    gridAutoRows: 'max-content',
    gridTemplateColumns: ({ info }) => (info ? '1fr minmax(0px, max-content)' : '1fr'),
    gridTemplateAreas: ({ error }) =>
      `"input-label input-hint" "input-frame input-frame"${
        error ? ' "input-error input-error"' : ''
      }`,
    gap: ({ compact }) => (compact ? 0 : 8),
  },
  error: {
    marginLeft: 4,
    gridArea: 'input-error',
    color: theme.components.input.error,
    lineHeight: '16px',
  },
  label: {
    marginLeft: 4,
    gridArea: 'input-label',
    transition: 'color .2s ease',
    color: ({ disabled }) =>
      disabled ? theme.components.input.label.disabled : theme.components.input.label.color,
  },
  info: {
    gridArea: 'input-hint',
    display: 'grid',
  },
  hint: {
    cursor: 'help',
    transition: 'color .2s ease',
    color: theme.components.input.label.hint,
    '& i': {
      cursor: 'help',
      marginRight: 8,
      transition: 'color .2s ease',
      color: theme.components.input.label.hint,
    },
  },
  inputFrame: {
    gridArea: 'input-frame',
    position: 'relative',
    borderWidth: ({ compact }) => (compact ? 0 : 1),
    borderStyle: 'solid',
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
    pointerEvents: ({ disabled }) => (disabled ? 'none' : 'unset'),
    borderColor: ({ error, focused }) => {
      if (error) {
        return theme.components.input.error
      }
      if (focused) {
        return theme.components.input.frame.activeBorder
      }
      return theme.components.input.frame.border
    },
    backgroundColor: ({ disabled }) =>
      disabled
        ? theme.components.input.frame.disabledBackground
        : theme.components.input.frame.background,
    transition: 'border-color .2s ease',
    borderRadius: 4,
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    gridTemplateColumns: ({ icon, placement }) =>
      icon ? (placement === 'end' ? '1fr max-content' : 'max-content 1fr') : 'unset',
    gap: 8,
    padding: ({ width }) => {
      const leftPaddDefault = 8
      const leftPadd = width > 0 ? width + leftPaddDefault : leftPaddDefault
      return `0 8px 0 ${leftPadd}px`
    },
  },
  focused: {
    borderColor: theme.components.input.frame.activeBorder,
  },
  maskText: {
    position: 'absolute',
    top: '50%',
    left: ({ icon }) => (icon ? 32 : 8),
    zIndex: 1,
    transform: 'translate(0, -50%)',
    color: theme.components.input.frame.color,
    transition: 'color .2s ease',
  },
  icon: {
    fontSize: ({ compact }) => (compact ? 12 : 16),
    lineHeight: '16px',
    padding: 4,
    borderRadius: 4,
    color: ({ disabled }) =>
      disabled
        ? theme.components.input.frame.disabledPlaceholder
        : theme.components.input.frame.color,
    transition: 'color .2s ease',
    order: ({ placement }) => (placement === 'end' ? 1 : -1),
  },
  input: {
    ...theme.typography.inputPlaceholder,
    transition: 'color .2s ease',
    minHeight: 36,
    outline: 0,
    padding: 0,
    margin: 0,
    width: '100%',

    color: ({ disabled }) =>
      disabled
        ? theme.components.input.frame.disabledPlaceholder
        : theme.components.input.frame.color,
    caretColor: theme.components.input.frame.color,
    background: 'transparent',
    boxSizing: 'border-box',
    border: 'none',
  },
  '@global': {
    // unfortunately globals wont combine
    'input::placeholder': {
      transition: 'color .2s ease',
      color: theme.components.input.frame.placeholder,
    },
    'input::-webkit-input-placeholder': {
      transition: 'color .2s ease',
      color: theme.components.input.frame.placeholder,
    },
    'input::-moz-placeholder': {
      transition: 'color .2s ease',
      color: theme.components.input.frame.placeholder,
    },
    'input:-ms-input-placeholder': {
      transition: 'color .2s ease',
      color: theme.components.input.frame.placeholder,
    },
    'input:-moz-placeholder': {
      transition: 'color .2s ease',
      color: theme.components.input.frame.placeholder,
    },

    'input.input-disabled::placeholder': {
      color: `${theme.components.input.frame.disabledPlaceholder} !important`,
    },
    'input.input-disabled::-webkit-input-placeholder': {
      color: `${theme.components.input.frame.disabledPlaceholder} !important`,
    },
    'input.input-disabled::-moz-placeholder': {
      color: `${theme.components.input.frame.disabledPlaceholder} !important`,
    },
    'input.input-disabled:-ms-input-placeholder': {
      color: `${theme.components.input.frame.disabledPlaceholder} !important`,
    },
    'input.input-disabled:-moz-placeholder': {
      color: `${theme.components.input.frame.disabledPlaceholder} !important`,
    },

    // 'input.input-disabled::placeholder': {
    //   color: [theme.components.input.frame.disabledPlaceholder, '!important'],
    // },
    // 'input.input-disabled::-webkit-input-placeholder': {
    //   color: [theme.components.input.frame.disabledPlaceholder, '!important'],
    // },
    // 'input.input-disabled::-moz-placeholder': {
    //   color: [theme.components.input.frame.disabledPlaceholder, '!important'],
    // },
    // 'input.input-disabled:-ms-input-placeholder': {
    //   color: [theme.components.input.frame.disabledPlaceholder, '!important'],
    // },
    // 'input.input-disabled:-moz-placeholder': {
    //   color: [theme.components.input.frame.disabledPlaceholder, '!important'],
    // },

    '*:-webkit-autofill': {
      transition: 'background-color 10000s', // dont let the background change
      transitionDelay: '10000s',
      '-webkit-text-fill-color': theme.components.input.frame.color,
      '-webkit-box-shadow': `0 0 0 30px ${theme.components.input.frame.background} inset !important`,
    },
    '*:-webkit-autofill:hover': {
      transition: 'background-color 10000s', // dont let the background change
      transitionDelay: '10000s',
      '-webkit-text-fill-color': theme.components.input.frame.color,
      '-webkit-box-shadow': `0 0 0 30px ${theme.components.input.frame.background} inset !important`,
    },
    '*:-webkit-autofill:focus': {
      transition: 'background-color 10000s', // dont let the background change
      transitionDelay: '10000s',
      '-webkit-text-fill-color': theme.components.input.frame.color,
      '-webkit-box-shadow': `0 0 0 30px ${theme.components.input.frame.background} inset !important`,
    },
    '*:-webkit-autofill:active': {
      transition: 'background-color 10000s', // dont let the background change
      transitionDelay: '10000s',
      '-webkit-text-fill-color': theme.components.input.frame.color,
      '-webkit-box-shadow': `0 0 0 30px ${theme.components.input.frame.background} inset !important`,
    },
  },
}))

export default Input
