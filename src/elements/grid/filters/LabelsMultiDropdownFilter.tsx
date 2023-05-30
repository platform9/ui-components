import React, { useMemo } from 'react'
import { emptyArr, ensureArray, isNilOrEmpty } from '../../../utils/fp'
import { equals } from 'ramda'
import MultiDropdown, { MultiDropdownProps } from '../../dropdown/MultiDropdown'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../../theme-manager/themes/model'
import ClearFiltersSection from './ClearFiltersSection'

const useStyles = makeStyles<Theme>((theme) => ({
  clearFilters: {
    background: theme.components.table.hoverBackground,
    padding: 8,
  },
  clearButton: {
    width: '100%',
  },
}))

interface KeyValuePair {
  key: string
  value: string
}

interface LabelPicklistProps extends Omit<MultiDropdownProps<KeyValuePair>, 'items'> {
  labels: KeyValuePair[]
}

export default function LabelsMultiDropdownFilter({
  label = 'Labels:',
  compact = true,
  labels = emptyArr,
  loading,
  onChange,
  value,
  ...rest
}: LabelPicklistProps) {
  const classes = useStyles()
  const options = useMemo(() => {
    return labels?.map((label) => {
      return {
        label: `${label?.key}=${label?.value}`,
        value: label,
      }
    })
  }, [labels])
  const selectedLabels = useMemo(() => {
    if (isNilOrEmpty(value) || isNilOrEmpty(options)) {
      return emptyArr as KeyValuePair[]
    }
    return ensureArray(value).filter((val) =>
      options.some((option) => {
        return equals(option.value, val)
      }),
    )
  }, [options, value])

  return (
    <MultiDropdown
      compact={compact}
      onChange={onChange}
      label={label}
      loading={loading}
      items={options}
      value={selectedLabels}
      bottomContent={<ClearFiltersSection onChange={onChange} />}
      {...rest}
    />
  )
}
