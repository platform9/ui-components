import React, { PropsWithChildren, useEffect, useCallback, useRef, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import clsx from 'clsx'
import { MenuPlacementProps } from './model'
import { bottomLeft } from './defaults'
import { getMenuTransform, getPortalMenuTop, getPortalMenuLeft } from './helpers'

export interface IMenuProps extends MenuPlacementProps {
  open: boolean
  anchor: JSX.Element
  origin?: string
  unorderedList?: boolean
  className?: string
  onClose?: () => void
}

type Props = IMenuProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

// @TODO Implement align and offset for PortalMenu
export default function PortalMenu({
  open = false,
  anchor,
  align = bottomLeft.align,
  offset = bottomLeft.offset,
  origin = 'center center',
  unorderedList = false,
  onClose,
  className,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const stopClickRef = useRef(true)
  const menuContainerRef = useRef<HTMLDivElement>()
  const rect = menuContainerRef?.current?.getBoundingClientRect()

  const classes = useStyles({
    vertAlign: align.vertical,
    horizAlign: align.horizontal,
    vertOffset: offset.vertical,
    horizOffset: offset.horizontal,
    origin,
    rect: rect,
  })
  const handleStopClick = useCallback(
    (e) => {
      // e.stopPropagation isn't preventing the close cb
      // trying with a flag
      stopClickRef.current = true
    },
    [stopClickRef],
  )
  const handleDocumentClick = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!stopClickRef.current) {
      // on close of the menu reset the ref to its default state
      stopClickRef.current = true
      onClose()
    } else {
      stopClickRef.current = false
    }
  }, [])

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleDocumentClick)
    } else {
      // on remove of event listener reset the ref to its default state
      stopClickRef.current = true
      document.removeEventListener('click', handleDocumentClick)
    }
    return () => {
      // if the menu is the user menu, and we click logout then
      // this component is unmounted before the click listener
      // can be removed on the next state update cycle
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [open])

  const menuElement = unorderedList ? 'ul' : 'nav'
  const MenuComponent = React.createElement(
    menuElement,
    {
      className: clsx(classes.menu, 'menu-popover', { active: open }),
      onClick: handleStopClick,
    },
    children,
  )
  return (
    <div ref={menuContainerRef} className={clsx(classes.menuContainer, className)} {...props}>
      {anchor}
      {open && <PortalMenuComponent MenuComponent={MenuComponent} />}
    </div>
  )
}

const PortalMenuComponent = ({ MenuComponent }) => {
  const portalElem = useMemo(() => document.getElementById('row-menu-portal-root'), [])
  if (!MenuComponent) return null
  return ReactDOM.createPortal(MenuComponent, portalElem)
}

interface StyleProps {
  vertAlign: IMenuProps['align']['vertical']
  horizAlign: IMenuProps['align']['horizontal']
  vertOffset: IMenuProps['offset']['vertical']
  horizOffset: IMenuProps['offset']['horizontal']
  origin: string
  rect: DOMRect
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  menuContainer: {
    position: 'relative',
  },
  menu: {
    minWidth: 296,
    position: 'absolute',
    opacity: 0,
    backgroundColor: theme.components.card.background,
    border: `1px solid ${theme.components.card.border}`,
    borderRadius: 4,
    transformOrigin: ({ origin }) => origin,
    transition: 'opacity .2s ease, transform .2s ease',
    zIndex: 100,
    transform: getMenuTransform(0),
    top: ({ rect, vertAlign, vertOffset }) => getPortalMenuTop({ rect, vertAlign, vertOffset }),
    left: ({ rect, horizAlign, horizOffset }) =>
      getPortalMenuLeft({ rect, horizAlign, horizOffset }),
    '&.active': {
      opacity: 1,
      transform: `scale(1) translate(0%, -20%)`,
    },
  },
}))
