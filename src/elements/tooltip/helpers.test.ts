import { getTooltipLeft, getTooltipTop } from './helpers'

describe('tooltip/helpers', () => {
  const rect = {
    top: 10,
    bottom: 30,
    left: 40,
    right: 80,
    width: 40,
    height: 20,
  } as DOMRect

  it('getTooltipTop supports top/middle/bottom with offsets', () => {
    expect(getTooltipTop(rect, 'top', 5)).toBe(10 - 5)
    expect(getTooltipTop(rect, 'bottom', 5)).toBe(30 + 5)
    expect(getTooltipTop(rect, 'middle', 5)).toBe(10 + 20 / 2 + 5)
  })

  it('getTooltipLeft supports left/middle/right with offsets', () => {
    expect(getTooltipLeft(rect, 'left', 3)).toBe(40 - 3)
    expect(getTooltipLeft(rect, 'right', 3)).toBe(80 + 3)
    expect(getTooltipLeft(rect, 'middle', 3)).toBe(40 + 40 / 2 + 3)
  })
})
