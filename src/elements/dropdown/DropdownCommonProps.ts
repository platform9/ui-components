import { ReactNode } from 'react'

export interface DropdownItemSpec<V> {
  key?: string | number
  value: V | '__all__' | '__none__'
  label?: string
  content?: ReactNode
  disabled?: boolean
}

export default interface DropdownCommonProps<
  V,
  T extends DropdownItemSpec<V> = DropdownItemSpec<V>,
> {
  items: T[]
  itemToString?: (item: T) => string
  label?: string
  error?: string
  name?: string
  placeholder?: string
  enableSearch?: boolean
  className?: string
  loading?: boolean
  loadingMessage?: string
  width?: number
  disabled?: boolean
  compact?: boolean
}
