import { defaultAllKey, defaultNoneKey, dropdownDefaultWidth } from './constants'

describe('dropdown/constants', () => {
  it('exports expected defaults', () => {
    expect(dropdownDefaultWidth).toBe(400)
    expect(defaultAllKey).toBe('__all__')
    expect(defaultNoneKey).toBe('__none__')
  })
})
