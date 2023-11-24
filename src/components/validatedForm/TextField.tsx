import React, { useCallback } from 'react'
import Input, { InputProps } from '../../elements/input/Input'
import withFormContext, {
  PropsWithFormContext,
} from '../../components/validatedForm/withFormContext'

interface TextFieldProps extends InputProps {
  returnAsString?: boolean
  type?: string
}

const TextField = ({
  value,
  label,
  hasError,
  errorMessage,
  required,
  variant,
  onChange,
  type,
  returnAsString,
  getCurrentValue,
  updateFieldValue,
  setFieldValue,
  ...restProps
}: PropsWithFormContext<string, TextFieldProps>) => {
  const handleChange = useCallback(
    (e) => {
      // HTML specs says that <input type="number"> return strings but it's more useful if we
      // convert it to a `Number` to reduce type casting all over the place.
      const strVal = e.target.value
      const value =
        type && type.toLowerCase() === 'number' && strVal !== '' ? Number(strVal) : strVal
      const returnValue = returnAsString ? String(value) : value

      if (onChange) {
        onChange(returnValue)
      }
    },
    [onChange, type],
  )
  return (
    <Input
      {...restProps}
      label={label && required ? `${label} *` : label}
      variant={variant}
      error={errorMessage}
      value={[undefined, ''].includes(value) ? '' : type === 'number' ? Number(value) : value}
      onChange={handleChange}
      type={type}
    />
  )
}

export default withFormContext(TextField)
