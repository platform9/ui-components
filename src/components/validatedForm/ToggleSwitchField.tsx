import React from 'react'
import withFormContext, {
  PropsWithFormContext,
} from '../../components/validatedForm/withFormContext'
import ToggleSwitch, { ToggleSwitchProps } from '../../elements/ToggleSwitch'
import { withInfoTooltip } from '../InfoTooltip'
import { compose } from '../../utils/fp'

function ToggleSwitchField({ onChange, value, ...restProps }) {
  return <ToggleSwitch {...restProps} active={!!value} onClick={(value) => onChange(value)} />
}

interface BaseToggleSwitchFieldProps extends Omit<ToggleSwitchProps, 'active'> {
  id: string
  required?: boolean
  disabled?: boolean
  label?: string
  onChange?: (value?: boolean) => void
}
export type ToggleSwitchFieldProps = PropsWithFormContext<boolean, BaseToggleSwitchFieldProps>

export default compose(withInfoTooltip, withFormContext)(ToggleSwitchField)
