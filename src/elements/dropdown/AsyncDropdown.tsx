import React, { ReactElement, useEffect, useRef } from 'react'
import withProgress, { PropsWithProgress } from '../../components/progress/withProgress'
import generateTestId from '../../utils/test-helpers'
import Dropdown, { DropdownProps } from '../../elements/dropdown/Dropdown'

export interface AsyncDropdownProps<V> extends PropsWithProgress<DropdownProps<V>> {
  // @deprecated use "compact" prop instead
  formField?: boolean
  selectFirst?: boolean
}

const DropdownWithProgress = withProgress(Dropdown, {
  inline: true,
  overlay: true,
}) as <V>(props: AsyncDropdownProps<V>) => ReactElement<AsyncDropdownProps<V>>

export type PropsWithAsyncDropdown<P, V = string> = Omit<AsyncDropdownProps<V>, 'items'> & P

export default function AsyncDropdown<V = string>({
  showAll = false,
  formField = false,
  compact = !formField,
  selectFirst = false,
  onChange,
  items,
  loading,
  loadingProps,
  ...props
}: AsyncDropdownProps<V>) {
  const isDataLoadedOnceRef = useRef(false)
  // Select first item when data is loaded, ie when "loading" switches from false to true (once)
  useEffect(() => {
    // TODO: Bug here where if there is a value existing, and the dropdown rerenders (for
    // example when switching wizard steps), selectFirst will reset the value
    if (selectFirst && !isDataLoadedOnceRef.current && !loading && items.length) {
      isDataLoadedOnceRef.current = true
      onChange(items[0].value)
    }
  }, [!!loading])

  return (
    <DropdownWithProgress<V>
      items={items}
      loading={loading}
      loadingProps={loadingProps}
      onChange={onChange}
      compact={compact}
      data-testid={generateTestId('dropdown', 'bar')}
      showAll={showAll}
      {...props}
    />
  )
}
