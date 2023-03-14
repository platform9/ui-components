export const getTooltipTop = (rect: DOMRect, align: 'top' | 'middle' | 'bottom', offset) => {
  const additionalOffset = align === 'top' ? -offset : offset
  if (align === 'middle') {
    return rect.top + rect.height / 2 + additionalOffset
  }
  return rect[align] + additionalOffset
}
export const getTooltipLeft = (rect: DOMRect, align: 'left' | 'middle' | 'right', offset) => {
  const additionalOffset = align === 'left' ? -offset : offset
  if (align === 'middle') {
    return rect.left + rect.width / 2 + additionalOffset
  }
  return rect[align] + additionalOffset
}
