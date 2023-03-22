import React, { FC, ReactElement } from 'react'
import withFormContext, {
  PropsWithFormContext,
} from '../../components/validatedForm/withFormContext'
import { compose } from '../../utils/fp'
import withTooltip, { PropsWithTooltip } from '../../elements/tooltip/withTooltip'
import { partialRight } from 'ramda'

type BaseDropdownFieldProps<V, P> = {
  [K in keyof P]: P[K]
} & {
  DropdownComponent: FC<P>
  required?: boolean
  disabled?: boolean
  label?: string
  error?: string
  onChange?: (value?: V) => void
}

export type DropdownFieldProps<V, P> = PropsWithFormContext<
  V,
  PropsWithTooltip<BaseDropdownFieldProps<V, P>>
>

interface DropdownComponentProps<V> {
  onChange?: (value: V) => void
  value?: V
  label?: string
  compact?: boolean
}

function DropdownField<V, P extends DropdownComponentProps<V>>({
  DropdownComponent,
  label,
  required,
  compact = false,
  errorMessage,
  ...rest
}: PropsWithFormContext<V, BaseDropdownFieldProps<V, P>>) {
  return (
    // @fixme fix these typing issues
    // @ts-ignore
    <DropdownComponent
      {...rest}
      compact={compact}
      label={label && required ? `${label} *` : label}
      error={errorMessage}
    />
  )
}

const defaultTooltipProps = {
  align: {
    vertical: 'middle',
    horizontal: 'right',
  },
}

export default compose(
  partialRight(withTooltip, [defaultTooltipProps]),
  withFormContext,
)(DropdownField) as <V, P>(
  props: DropdownFieldProps<V, P>,
) => ReactElement<DropdownFieldProps<V, P>>
