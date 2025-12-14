import type DropdownCommonProps from './DropdownCommonProps'
import type { DropdownItemSpec } from './DropdownCommonProps'

describe('dropdown/DropdownCommonProps', () => {
  it('exports DropdownCommonProps and DropdownItemSpec types', () => {
    type V = string

    const items: DropdownItemSpec<V>[] = [
      { value: '__all__', label: 'All' },
      { value: 'a', label: 'A' },
    ]

    const props: DropdownCommonProps<V> = {
      items,
      label: 'Test',
      placeholder: 'Select',
      enableSearch: true,
      disabled: false,
      compact: false,
    }

    expect(props.items).toHaveLength(2)
    expect(props.items[0].value).toBe('__all__')
  })
})
