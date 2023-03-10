import React from 'react'
import Checkbox, { CheckboxProps } from 'src/elements/input/Checkbox'
import withFormContext, { PropsWithFormContext } from 'src/components/validatedForm/withFormContext'
import { PropsWithTooltip } from 'src/elements/tooltip/withTooltip'

function CheckboxField({ value, ...restProps }: CheckboxFieldProps) {
  return (
    <Checkbox
      {...restProps}
      textWeight="light"
      checked={!!value}
      // error={errorMessage}
    />
  )
}

interface BaseCheckboxFieldProps extends Omit<CheckboxProps, 'checked'> {
  required?: boolean
  disabled?: boolean
  label?: string
  onChange?: (value?: boolean) => void
}
export type CheckboxFieldProps = PropsWithFormContext<
  boolean,
  PropsWithTooltip<BaseCheckboxFieldProps>
>

export default withFormContext(CheckboxField)
