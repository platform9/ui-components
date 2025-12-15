import { getMenuBottom, getMenuLeft, getMenuRight, getMenuTop, getMenuTransform, makeMenuPositionProps } from './helpers'

describe('menu/helpers', () => {
  it('computes top/right/bottom/left based on align and offsets', () => {
    expect(getMenuTop({ vertAlign: 'bottom', vertOffset: 8 })).toBe('calc(100% + 8px)')
    expect(getMenuTop({ vertAlign: 'middle', vertOffset: 2 })).toBe('calc(50% + 2px)')
    expect(getMenuTop({ vertAlign: 'top', vertOffset: 2 })).toBe('unset')

    expect(getMenuRight({ horizAlign: 'left', horizOffset: 5 })).toBe('calc(100% + 5px)')
    expect(getMenuRight({ horizAlign: 'middle', horizOffset: 1 })).toBe('calc(50% + 1px)')
    expect(getMenuRight({ horizAlign: 'right', horizOffset: 1 })).toBe('unset')

    expect(getMenuBottom({ vertAlign: 'top', vertOffset: 3 })).toBe('calc(100% + 3px)')
    expect(getMenuBottom({ vertAlign: 'bottom', vertOffset: 3 })).toBe('unset')

    expect(getMenuLeft({ horizAlign: 'right', horizOffset: 7 })).toBe('calc(100% + 7px)')
    expect(getMenuLeft({ horizAlign: 'left', horizOffset: 7 })).toBe('unset')
  })

  it('getMenuTransform returns scaled translate for middle alignment', () => {
    const transform = getMenuTransform(0.95)
    expect(transform({ vertAlign: 'middle', horizAlign: 'middle' })).toBe('scale(0.95) translate(50%, -50%)')
    expect(transform({ vertAlign: 'top', horizAlign: 'right' })).toBe('scale(0.95)')
  })

  it('makeMenuPositionProps builds align/offset structure', () => {
    expect(makeMenuPositionProps('top', 'left', 8, 0)).toEqual({
      align: { vertical: 'top', horizontal: 'left' },
      offset: { vertical: 8, horizontal: 0 },
    })
  })
})
