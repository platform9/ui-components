import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React from 'react'
import Theme from 'src/theme-manager/themes/model'
import FontAwesomeIcon from './FontAwesomeIcon'
import TextField from './validatedForm/TextField'

interface Props {
  id?: string
  onChange: (value: number) => void
  value?: number
  className?: string
  disabled?: boolean
  iconSize?: 'sm' | 'lg'
  min?: number
  max?: number
  allowTypedInput?: boolean
}

export default function QuantitySelector({
  id,
  value,
  onChange,
  className,
  disabled = false,
  iconSize = 'sm',
  min = 0,
  max,
  allowTypedInput = true,
}: Props) {
  const classes = useStyles({ disabled })
  const [inputValue, setInputValue] = React.useState(value)

  const decrement = () => {
    const newValue = inputValue - 1 < min ? inputValue : inputValue - 1
    onChange(newValue)
    setInputValue(newValue)
  }

  const increment = () => {
    const newValue = max && inputValue + 1 > max ? max : inputValue + 1
    onChange(newValue)
    setInputValue(newValue)
  }

  const handleInputChange = (newValue) => {
    setInputValue(newValue)
    onChange(newValue)
  }

  return (
    <div className={clsx(classes.quantitySelector, className)} data-testid="quantity-selector">
      <button
        type="button"
        className={clsx(classes.button, 'button')}
        onClick={decrement}
        data-testid="decrement-btn"
      >
        <FontAwesomeIcon size={iconSize} className={classes.icon}>
          minus
        </FontAwesomeIcon>
      </button>
      <TextField
        id={id}
        data-testid="quantity-input-field"
        type="number"
        value={inputValue}
        className={classes.input}
        onChange={handleInputChange}
        min={min}
        disabled={disabled}
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        enterKeyHint={undefined}
      />
      <button
        type="button"
        className={clsx(classes.button, 'button')}
        onClick={increment}
        data-testid="increment-btn"
      >
        <FontAwesomeIcon size={iconSize} className={classes.icon}>
          plus
        </FontAwesomeIcon>
      </button>
    </div>
  )
}

const useStyles = makeStyles<Theme, { disabled?: boolean }>((theme) => ({
  quantitySelector: {
    display: 'grid',
    gridTemplateColumns: '30% 40% 30%',
    height: 'min-content',
    width: '127px',
    border: `1px solid ${theme.palette.grey[200]}`,
    transition: 'all .2s ease',
    backgroundColor: ({ disabled }) =>
      disabled ? theme.palette.grey[50] : theme.palette.common.white,
    borderRadius: '4px',
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    backgroundColor: ({ disabled }) =>
      disabled ? theme.palette.grey[50] : theme.palette.common.white,
    '&:hover': {
      backgroundColor: ({ disabled }) =>
        disabled ? 'transparent' : theme.components.selectableCard.activeBackground,
    },
    borderRadius: '4px',
  },
  input: {
    minWidth: '32px',
    maxWidth: '70px',
    gap: '0px',
    '& .inputFrame': {
      borderTop: 'none',
      borderBottom: 'none',
      borderLeft: `1px solid ${theme.palette.grey[200]}`,
      borderRight: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: 0,
    },
    '& .input': {
      textAlign: 'center',
      '-moz-appearance': 'textfield', // hide increment/decrement arrows in Firefox
    },
    // Hide the up and down arrows in all browsers
    '& .input::-webkit-inner-spin-button, & .input::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& .input::-ms-clear': {
      display: 'none',
    },
  },
  icon: {
    color: ({ disabled }) => (disabled ? theme.palette.grey[300] : theme.palette.grey[900]),
  },
}))
