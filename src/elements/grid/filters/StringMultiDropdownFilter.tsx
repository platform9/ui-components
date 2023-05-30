import React, { useMemo } from 'react'
import { emptyArr, ensureArray, isNilOrEmpty } from '../../../utils/fp'
import { equals } from 'ramda'
import MultiDropdown, { MultiDropdownProps } from '../../dropdown/MultiDropdown'
import ClearFiltersSection from './ClearFiltersSection'

interface Option {
  label: string
  value: string
}

// Potentially change component in future to take any type of property as its value
interface SimpleValuePicklistProps extends Omit<MultiDropdownProps<string>, 'items'> {
  dropdownOptions: Option[]
}

export default function StringMultiDropdownFilter({
  label = 'Filter:',
  compact = true,
  dropdownOptions: options = emptyArr,
  loading,
  onChange,
  value,
  ...rest
}: SimpleValuePicklistProps) {
  const selectedLabels = useMemo(() => {
    if (isNilOrEmpty(value) || isNilOrEmpty(options)) {
      return emptyArr as string[]
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
