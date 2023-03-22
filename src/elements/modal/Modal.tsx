import React, { PropsWithChildren, useMemo, useCallback, useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Theme from '../../theme-manager/themes/model'
import Text from '../../elements/Text'
import { hexToRgbaCss } from '../../utils/colorHelpers'
// import DocumentMeta from '../components/DocumentMeta'
import generateTestId from '../../utils/test-helpers'

export interface ModalProps {
  open: boolean
  onClose: (e?: any) => void
  onBackdropClick?: (e?: any) => void
  onClick?: (e?: any) => void
  title?: string | React.ReactNode
  entityName?: string
  panel?: 'drawer' | 'dialog'
  info?: string | React.ReactNode
  anchorId?: string
  className?: string
  footer?: React.ReactNode
  slideFrom?: 'top' | 'right' | 'bottom' | 'left'
  maxWidth?: number
  showOverlay?: boolean
}

// TODO: Find a way to add DocumentMeta back in. I had to take it out for now
// since it requires us to import the Breadcrumbs component which is more PF9 UI
// specific

export default function Modal({
  onClose,
  onClick,
  onBackdropClick,
  open = false,
  showOverlay = true,
  title = '',
  entityName = '',
  info = '',
  anchorId = 'modal-portal-root',
  footer = undefined,
  slideFrom = 'right',
  panel = 'drawer',
  maxWidth,
  children,
  className,
  ...rest
}: PropsWithChildren<ModalProps>) {
  const animationDuration = panel === 'drawer' ? 350 : 200
  const hasFooter = !!footer
  const classes = useStyles({ hasFooter, slideFrom, panel, animationDuration, maxWidth })
  const containerElem = useMemo(() => document.getElementById(anchorId), [anchorId])
  const [openState, setOpenState] = useState(false)

  useEffect(() => {
    if (open && !openState) {
      // give the first render cycle time before kicking off the animation
      setTimeout(() => {
        setOpenState(true)
      }, 10)
    }
    if (!open && openState) {
      // give the last render cycle its animation duration before removal
      setTimeout(() => {
        setOpenState(false)
      }, animationDuration)
    }
  }, [open])

  const handleBackdropClick = useCallback(
    (e) => {
      onBackdropClick ? onBackdropClick(e) : onClose(e)
    },
    [onClose, onBackdropClick],
  )
  if (!open && !openState) {
    return null
  }
  const infoComponent = !info ? null : typeof info === 'string' ? (
    <Text data-testid={generateTestId('test', 'completion', 'status')} variant="body1">
      {info}
    </Text>
  ) : (
    info
  )
  const content = (
    <div
      className={clsx(classes.modalPage, {
        [classes.isNotOpen]: !open,
        [classes.isOpen]: openState && open,
      })}
    >
      {/* <DocumentMeta bodyClasses={open ? ['blur'] : undefined} /> */}
      <div
        className={clsx({
          [classes.overlay]: showOverlay,
        })}
        onClick={handleBackdropClick}
      />
      <article
        onClick={onClick}
        className={clsx(className, classes.modalContainer, { open: openState && open })}
        {...rest}
      >
        {(title || infoComponent) && (
          <Text
            data-testid={generateTestId(title, 'grid', 'text')}
            component="header"
            variant="h4"
            className={clsx('modal-header', classes.gridContainer, classes.modalHeader)}
          >
            <div>
              <span>{title}</span>
              {entityName && <span className={classes.entityName}>{` (${entityName})`}</span>}
            </div>
            {infoComponent}
          </Text>
        )}
        <section className={clsx('modal-body', classes.modalBody)}>{children}</section>
        {hasFooter && (
          <Text
            component="footer"
            className={clsx('modal-footer', classes.gridContainer, classes.modalFooter)}
          >
            {footer}
          </Text>
        )}
      </article>
    </div>
  )

  return ReactDOM.createPortal(content, containerElem)
}

const getTranslateAxis = (slideFrom, value) => {
  const translateAxis = slideFrom === 'left' || slideFrom === 'right' ? 'X' : 'Y'
  const posNegAxis = slideFrom === 'left' || slideFrom === 'top' ? '-' : ''
  return `translate${translateAxis}(${posNegAxis}${value}${value === 0 ? '' : '%'})`
}

interface StyleProps {
  hasFooter: boolean
  slideFrom: ModalProps['slideFrom']
  panel: ModalProps['panel']
  animationDuration: number
  maxWidth: number
}
const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  modalPage: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'grid',
    justifyItems: ({ panel }) => (panel === 'drawer' ? 'end' : 'center'),
    alignItems: 'center',
    alignContent: ({ panel }) => (panel === 'drawer' ? 'start' : 'center'),
    transitionProperty: 'transform, opacity',
    transitionDuration: ({ animationDuration }) => `${animationDuration}ms`,
    transitionTimingFunction: 'ease-out',
    opacity: 0,
    transform: ({ slideFrom, panel }) =>
      panel === 'drawer' ? getTranslateAxis(slideFrom, 115) : 'unset',
  },
  isNotOpen: {
    transitionTimingFunction: 'ease-in',
  },
  isOpen: {
    opacity: 1,
    transform: ({ slideFrom, panel }) =>
      panel === 'drawer' ? getTranslateAxis(slideFrom, 0) : 'unset',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: hexToRgbaCss(theme.components.frame.background, 0.75),
    zIndex: 1,
    cursor: 'pointer',
  },
  modalContainer: {
    height: ({ panel }) => (panel === 'drawer' ? '100vh' : 'unset'),
    width: '100%',
    maxHeight: ({ panel }) => (panel === 'dialog' ? '90vh' : 'initial'),
    minWidth: 'min-content',
    maxWidth: ({ panel, maxWidth }) => (maxWidth ? maxWidth : panel === 'dialog' ? 500 : 800),
    backgroundColor: theme.components.card.background,
    border: `1px solid ${theme.components.card.border}`,
    boxSizing: 'border-box',
    zIndex: 100,
    transform: ({ panel }) => (panel === 'dialog' ? 'scale(0)' : 'unset'),

    display: 'grid',
    gridTemplateRows: ({ hasFooter }) =>
      hasFooter ? 'max-content 1fr max-content' : 'max-content 1fr',

    transitionProperty: 'transform',
    transitionDuration: ({ animationDuration }) => `${animationDuration}ms`,
    transitionTimingFunction: 'ease-out',

    '&.open': {
      transform: ({ panel }) => (panel === 'dialog' ? 'scale(1)' : 'unset'),
      transitionTimingFunction: 'ease-in',
    },

    '@media (max-width:1100px)': {
      maxWidth: 600,
    },
    '@media (max-width:800px)': {
      maxWidth: '75%',
    },
    '@media (max-width:600px)': {
      '& section.modal-body': {
        padding: '32px 16px 24px 24px',
      },
      '& header.modal-header, & footer.modal-footer': {
        padding: '0 16px 0 24px',
      },
    },
  },
  gridContainer: {
    boxSizing: 'border-box',
    height: 72,
    padding: '0 24px 0 32px',
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
  },
  modalHeader: {
    borderBottom: `1px solid ${theme.components.card.border}`,
    justifyContent: 'space-between',
  },
  entityName: {
    fontWeight: 'normal',
  },
  modalBody: {
    boxSizing: 'border-box',
    padding: '32px 24px 24px 32px',
    display: 'grid',
    gap: 16,
    alignContent: 'start',
    overflow: 'auto',
  },
  modalFooter: {
    borderTop: `1px solid ${theme.components.card.border}`,
    justifyContent: 'start',
    gap: 16,
  },
}))
