import React, {
  ReactNode,
  PropsWithChildren,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react'
import ReactDOM from 'react-dom'
import Theme from '../../theme-manager/themes/model'
import Text from '../../elements/Text'
import clsx from 'clsx'
import {
  getMenuTransform,
  getMenuTop,
  getMenuRight,
  getMenuBottom,
  getMenuLeft,
} from '../menu/helpers'
import { middleRight } from '../../elements/menu/defaults'
import { styled } from '@material-ui/styles'
import { debounce, CancellableDebounceFn } from '../../utils/async'
import { stopPropagation } from '../../utils/fp'
import { getTooltipTop, getTooltipLeft } from './helpers'

export interface TooltipProps {
  message?: string | ReactNode
  customBody?: ReactNode
  align?: {
    vertical: 'top' | 'middle' | 'bottom'
    horizontal: 'left' | 'middle' | 'right'
  }
  offset?: {
    vertical: number
    horizontal: number
  }
  origin?: string
  customClassName?: string
}

interface StyleProps {
  origin: string
  hasCustomBody: boolean
  className?: string
  customClass: string
  align: TooltipProps['align']
  offset: TooltipProps['offset']
}

// Time to wait before unmounting the tooltip to make it interactive
const transitionDelayMs = 50

// The Tooltip container
export default styled(
  ({
    message,
    align = middleRight.align,
    offset = middleRight.offset,
    origin = 'center center',
    children,
    className,
    customClassName,
    customBody = undefined,
  }: PropsWithChildren<TooltipProps & { className: string }>) => {
    const tooltipContainerRef = useRef<HTMLDivElement>()
    const debounceRef = useRef<CancellableDebounceFn>()
    const [isHovering, setIsHovering] = useState(false)
    const handleMouseOver = useCallback(() => {
      debounceRef.current?.cancel()
      setIsHovering(true)
    }, [])
    const handleMouseOut = useCallback(() => {
      debounceRef.current?.cancel()
      debounceRef.current = debounce(() => {
        setIsHovering(false)
      }, transitionDelayMs)
      debounceRef.current()
    }, [])

    const handleMouseClick = useCallback(() => {
      // Make sure we are still hovering this element after clicking some element in the container
      // This fixes the issue with elements shown outside the tooltip container (e.g. dropdown menu)
      // not triggering an "onMouseLeave" event when selecting an item
      debounceRef.current?.cancel()
      debounceRef.current = debounce(() => {
        if (isHovering && tooltipContainerRef.current?.matches(':hover') === false) {
          setIsHovering(false)
        }
      }, transitionDelayMs)
      debounceRef.current()
    }, [isHovering])

    useEffect(() => {
      // Cancel debouncing when component gets unmounted
      return () => debounceRef.current?.cancel()
    }, [])

    const hasCustomBody = !!customBody
    const hasContent = !!message || hasCustomBody
    return (
      <div
        ref={tooltipContainerRef}
        className={clsx(className, 'tooltip-container')}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onClick={handleMouseClick}
      >
        {hasContent && isHovering && (
          <Tooltip
            customClass={customClassName}
            hasCustomBody={hasCustomBody}
            origin={origin}
            align={align}
            offset={offset}
            containerElem={tooltipContainerRef.current}
          >
            {customBody ?? message}
          </Tooltip>
        )}
        {children}
      </div>
    )
  },
)({
  // TODO: Add hint question mark tooltip to dropdowns like we do for text inputs
  // then add this back and remove the custom styling on ValidatedForm.js
  // position: 'relative', * prob will not be needed
  // width: 'max-content',
})

interface TCStyleProps {
  rect: DOMRect
  align: TooltipProps['align']
  offset: TooltipProps['offset']
}

const TooltipContainer = styled('div')<Theme, TCStyleProps>(
  ({
    rect,
    align: { vertical: vertAlign, horizontal: horizAlign },
    offset: { vertical: vertOffset, horizontal: horizOffset },
  }) => ({
    position: 'absolute',
    top: getTooltipTop(rect, vertAlign, vertOffset),
    left: getTooltipLeft(rect, horizAlign, horizOffset),
  }),
)

const Tooltip = styled(
  ({
    className,
    customClass,
    children,
    containerElem,
    align,
    offset,
  }: PropsWithChildren<StyleProps & { containerElem: HTMLDivElement }>) => {
    const portalElem = useMemo(() => document.getElementById('tooltip-portal-root'), [])
    const [transitionClass, setTransitionClass] = useState('transitionStart')
    useEffect(() => {
      setTransitionClass('transitionEnd')
    }, [])
    if (!containerElem) return null
    const rect = containerElem.getBoundingClientRect()

    const content = (
      <TooltipContainer rect={rect} align={align} offset={offset}>
        <Text
          variant="body2"
          component="div"
          className={clsx(className, customClass, transitionClass)}
          onClick={stopPropagation}
        >
          {children}
        </Text>
      </TooltipContainer>
    )
    return ReactDOM.createPortal(content, portalElem)
  },
)<Theme, StyleProps>(
  ({ theme, align: { vertical: vertAlign, horizontal: horizAlign }, hasCustomBody, origin }) => ({
    '&.transitionStart ': {
      opacity: 0,
      transform: getMenuTransform(0)({ vertAlign, horizAlign }),
    },
    '&.transitionEnd ': {
      opacity: 1,
      transform: getMenuTransform(1)({ vertAlign, horizAlign }),
    },
    position: 'absolute',
    transformOrigin: origin,
    transition: 'opacity .2s ease, transform .2s ease',
    zIndex: 10000,
    top: getMenuTop({ vertAlign }),
    right: getMenuRight({ horizAlign }),
    bottom: getMenuBottom({ vertAlign }),
    left: getMenuLeft({ horizAlign }),
    backgroundColor: theme.components.tooltip.background,
    border: 'none',
    borderRadius: 4,
    color: theme.components.tooltip.text,
    width: 'max-content',
    padding: !hasCustomBody ? 8 : null,
    maxWidth: !hasCustomBody ? 300 : null,
  }),
)
