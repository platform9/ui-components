import React from 'react'
import Checkbox, { CheckboxProps } from './Checkbox'

export default function Radio(props: Omit<CheckboxProps, 'indeterminate'>) {
  return <Checkbox {...props} type="radio" />
}
