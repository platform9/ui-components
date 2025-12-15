import { defaultItemToString } from './helpers'

describe('dropdown/helpers', () => {
  it('returns label when present', () => {
    expect(defaultItemToString({ label: 'My Label', value: 'v' })).toBe('My Label')
  })

  it('falls back to stringified value when label is missing', () => {
    expect(defaultItemToString({ value: 123 })).toBe('123')
  })

  it('returns null when item is falsy', () => {
    expect(defaultItemToString(null)).toBeNull()
  })

  it('returns null when value is falsy and label is missing', () => {
    expect(defaultItemToString({ value: 0 })).toBeNull()
    expect(defaultItemToString({ value: '' })).toBeNull()
  })
})
