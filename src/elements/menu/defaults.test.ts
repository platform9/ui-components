import { bottomLeft, bottomMiddle, bottomRight, middleLeft, middleRight, topLeft, topMiddle, topRight } from './defaults'

describe('menu/defaults', () => {
  it('exports standard placement presets', () => {
    expect(topMiddle.align).toEqual({ vertical: 'top', horizontal: 'middle' })
    expect(topRight.align).toEqual({ vertical: 'top', horizontal: 'right' })
    expect(topLeft.align).toEqual({ vertical: 'top', horizontal: 'left' })

    expect(middleRight.align).toEqual({ vertical: 'middle', horizontal: 'right' })
    expect(middleLeft.align).toEqual({ vertical: 'middle', horizontal: 'left' })

    expect(bottomMiddle.align).toEqual({ vertical: 'bottom', horizontal: 'middle' })
    expect(bottomRight.align).toEqual({ vertical: 'bottom', horizontal: 'right' })
    expect(bottomLeft.align).toEqual({ vertical: 'bottom', horizontal: 'left' })
  })
})
