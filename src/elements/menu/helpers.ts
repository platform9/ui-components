import { memoize } from 'src/utils/misc'
import { AlignVertical, AlignHorizontal } from './model'

export const getMenuTransform = (scale) =>
  memoize(({ vertAlign, horizAlign }) => {
    const tLeft = horizAlign === 'middle' ? '50%' : '0%'
    const tTop = vertAlign === 'middle' ? '-50%' : '0%'
    if (vertAlign === 'middle' || horizAlign === 'middle') {
      return `scale(${scale}) translate(${tLeft}, ${tTop})`
    }
    return `scale(${scale})`
  })
export const getMenuTop = memoize(({ vertAlign, vertOffset = 0 }) => {
  if (vertAlign === 'bottom') {
    return `calc(100% + ${vertOffset}px)`
  }
  if (vertAlign === 'middle') {
    return `calc(50% + ${vertOffset}px)`
  }
  return 'unset'
})
export const getMenuRight = memoize(({ horizAlign, horizOffset = 0 }) => {
  if (horizAlign === 'left') {
    return `calc(100% + ${horizOffset}px)`
  }
  if (horizAlign === 'middle') {
    return `calc(50% + ${horizOffset}px)`
  }
  return 'unset'
})

export const getMenuBottom = memoize(({ vertAlign, vertOffset = 0 }) =>
  vertAlign === 'top' ? `calc(100% + ${vertOffset}px)` : 'unset',
)

export const getMenuLeft = memoize(({ horizAlign, horizOffset = 0 }) =>
  horizAlign === 'right' ? `calc(100% + ${horizOffset}px)` : 'unset',
)

export const makeMenuPositionProps = (
  va: AlignVertical,
  ha: AlignHorizontal,
  vo: number,
  ho: number,
) => ({
  align: {
    vertical: va,
    horizontal: ha,
  },
  offset: {
    vertical: vo,
    horizontal: ho,
  },
})
