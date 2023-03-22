import React from 'react'
import { withInfoTooltip } from '../../components/InfoTooltip'
import { FormControl, FormHelperText } from '@material-ui/core'
import { compose } from '../../utils/fp'
import Text from '../../elements/Text'
import KeyValues, { EntryShape } from '../../components/KeyValues'
import withFormContext from '../../components/validatedForm/withFormContext'

interface Props {
  id: string
  value: any
  required?: boolean
  label?: string
  hasError?: boolean
  errorMessage?: string
  onChange?: any
  initialValue?: EntryShape[]
  keySuggestions?: any
  valueSuggestions?: any
  blacklistedTags?: string[]
  allowMultipleValues?: boolean
  keyLabel?: string
  valueLabel?: string
  addLabel?: string
  additionalFields?: any
}

// We need to use `forwardRef` as a workaround of an issue with material-ui Tooltip https://github.com/gregnb/mui-datatables/issues/595
const KeyValuesField = React.forwardRef<HTMLElement, Props>(
  (
    {
      id,
      value,
      required,
      label = '',
      hasError,
      errorMessage,
      onChange,
      keySuggestions,
      valueSuggestions,
      blacklistedTags = [],
      keyLabel,
      valueLabel,
      allowMultipleValues = true,
      addLabel,
      additionalFields = [],
      ...restProps
    }: Props,
    ref: React.Ref<HTMLDivElement>,
  ) => (
    <FormControl id={id} error={hasError} {...restProps} ref={ref}>
      {!!label && (
        <>
          <Text variant="caption1">{required ? `${label} *` : label}</Text>
          <br />
        </>
      )}
      <KeyValues
        entries={value}
        onChange={onChange}
        keySuggestions={keySuggestions}
        valueSuggestions={valueSuggestions}
        blacklistedTags={blacklistedTags}
        addLabel={addLabel || `Add ${label}`}
        keyLabel={keyLabel}
        valueLabel={valueLabel}
        allowMultipleValues={allowMultipleValues}
        additionalFields={additionalFields}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  ),
)

export default compose(
  withInfoTooltip, // This HoC causes unnecessary re-renders if declared after withFormContext
  withFormContext,
)(KeyValuesField)
