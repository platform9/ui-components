import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import Text from '../Text'
import Tooltip from 'src/elements/tooltip'
import generateTestId from 'src/utils/test-helpers'

export interface CheckboxProps {
  id?: any
  type?: 'checkbox' | 'radio'
  textWeight?: 'heavy' | 'light'
  checked: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  label?: string | React.ReactNode
  info?: string | React.ReactNode
  className?: string
  indeterminate?: boolean
  containerComponent?: 'div' | 'fieldset'
}

export default function Checkbox({
  id,
  type = 'checkbox',
  textWeight = 'heavy',
  checked,
  disabled = false,
  onChange,
  label = undefined,
  info = undefined,
  className = undefined,
  indeterminate = false,
  containerComponent = 'div',
  ...props
}: CheckboxProps) {
  const classes = useStyles({ checked, indeterminate, disabled })
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked)
    }
  }
  const children = [
    <input
      key={`${id}-input`}
      data-testid={generateTestId(label, 'checkbox', 'selection')}
      className={classes.input}
      type="checkbox"
      {...props}
    />,
    <Text
      key={`${id}-label`}
      data-testid={generateTestId(label)}
      variant={textWeight === 'heavy' ? 'caption1' : 'body2'}
      component="label"
      className={classes.label}
    >
      <span
        className={clsx(`${type}-frame`, classes.displayContainer, {
          'fa-regular': type === 'checkbox',
          'fa-check': type === 'checkbox' && !indeterminate,
          'fa-dash': type === 'checkbox' && indeterminate,
          [classes.checkbox]: type === 'checkbox',
          [classes.radio]: type === 'radio',
          [classes.indeterminate]: indeterminate,
        })}
      />
      {label ? <span className={classes.text}>{label}</span> : null}
    </Text>,
  ]
  const element = React.createElement(
    containerComponent,
    {
      className: clsx(classes.container, className, 'checkbox'),
      onClick: handleClick,
    },
    children,
  )
  if (info) {
    return <Tooltip message={info}>{element}</Tooltip>
  }
  return element
}

interface StyleProps {
  indeterminate: boolean
  checked: boolean
  disabled: boolean
}
type CheckboxKeys = keyof Theme['components']['checkbox']
const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  container: {
    position: 'relative',
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
    padding: '6px',
    borderRadius: 4,
    height: 16,
    minWidth: 16,
    width: 'max-content',
    transition: 'background .2s ease',
    '&:hover': {
      background: theme.components.checkbox.hoverBackground,
    },
  },
  input: {
    position: 'absolute',
    left: 0,
    opacity: 0.01,
    pointerEvents: 'none',
    borderRadius: 4,
  },
  label: {
    position: 'relative',
    paddingLeft: 8,
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
    display: 'grid',
    alignItems: 'center',
  },
  text: {
    minHeight: 16,
    display: 'inline-block',
    lineHeight: '16px',
    marginLeft: 18,
    color: ({ disabled }) => {
      const key: CheckboxKeys = disabled ? 'disabledColor' : 'color'
      return theme.components.checkbox[key]
    },
  },
  displayContainer: {
    position: 'absolute',
    left: 0,
    top: 8,
    width: 14, // account for 1px border
    height: 14, // account for 1px border
    border: ({ checked, disabled }) => {
      const key: CheckboxKeys = disabled ? 'disabledBorder' : checked ? 'selectedBorder' : 'border'
      return `1px solid ${theme.components.checkbox[key]}`
    },
    transform: 'translate(0%, -50%)',
  },
  radio: {
    borderRadius: 100,
    '&:before': {
      // plug
      content: '""',
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: 10,
      height: 10,
      background: ({ disabled }) => {
        const key: CheckboxKeys = disabled ? 'disabledBackground' : 'selectedBackground'
        return theme.components.checkbox[key]
      },
      borderRadius: 100,
      transform: 'translate(-50%, -50%)',
      transition: 'opacity .2s ease',
      opacity: ({ checked }) => (checked ? 1 : 0),
    },
  },
  checkbox: {
    borderRadius: 2,
    transition: 'background .2s ease',
    background: ({ checked, disabled }) => {
      const key: CheckboxKeys =
        disabled && checked
          ? 'disabledBackground'
          : !disabled && checked
          ? 'selectedBackground'
          : 'background'
      return theme.components.checkbox[key]
    },
    '&:before': {
      color: theme.components.checkbox.selectedColor,
      fontSize: 12,
      position: 'absolute',
      top: 1.5,
      left: 1,
      fontWeight: 600,
      opacity: ({ checked }) => (checked ? 1 : 0),
    },
  },
  indeterminate: {
    '&.checkbox-frame:before': {
      top: 2.5,
      left: 2.5,
      fontSize: 9,
      fontWeight: 'bold',
    },
  },
}))
