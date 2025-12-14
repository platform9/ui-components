import type { AlignHorizontal, AlignVertical, MenuPlacementProps, TooltipProps } from './model'

describe('menu/model', () => {
  it('exports menu-related types', () => {
    const v: AlignVertical = 'top'
    const h: AlignHorizontal = 'left'

    const placement: MenuPlacementProps = {
      align: { vertical: v, horizontal: h },
      offset: { vertical: 1, horizontal: 2 },
    }

    const tooltip: TooltipProps = { message: 'hello' }

    expect(placement.align?.vertical).toBe('top')
    expect(tooltip.message).toBe('hello')
  })
})
