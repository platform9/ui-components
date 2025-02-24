import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import Theme from 'src/theme-manager/themes/model'
import FontAwesomeIcon from '../FontAwesomeIcon'

interface AccordionProps {
  id: string
  title: string | React.ReactNode
  className?: string
  icon?: string

  // Controlled accordion
  open?: boolean
  onClick?: () => void
}
export default function Accordion({
  id,
  title,
  children,
  open = undefined,
  className,
  onClick,
  icon = 'chevron-right',
  ...props
}: PropsWithChildren<AccordionProps>) {
  const [active, toggleActive] = useState(open || false)
  const [height, setHeight] = useState(0)
  const isControlledComponent = open !== undefined && onClick !== undefined

  const content = useRef<HTMLDivElement>(null)
  const classes = useStyles({ active, open, height })

  const titleComponent = useMemo(
    () => (typeof title === 'string' ? <p className={classes.accordionTitle}>{title}</p> : title),
    [title],
  )

  useEffect(() => {
    if (isControlledComponent) {
      toggleActive(open)
    }
  }, [open, isControlledComponent])

  useEffect(() => {
    if (content.current) {
      const contentHeight = content.current.scrollHeight
      setHeight(active ? contentHeight : 0)
    }
  }, [active, children])

  const handleToggleClick = () => {
    isControlledComponent ? onClick() : toggleActive(!active)
  }

  return (
    <div className={clsx(classes.accordionContainer, className)} id={id}>
      <div className={clsx(classes.accordionTopBar, 'accordionTopBar')} onClick={handleToggleClick}>
        {titleComponent}
        <FontAwesomeIcon solid size="xs" className={clsx(classes.icon, 'toggleIcon')}>
          {icon}
        </FontAwesomeIcon>
      </div>

      <div
        ref={content}
        className={clsx(classes.accordionContent, 'accordionContent')}
        style={{ maxHeight: `${height}px` }}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
interface AcccordionStylProps {
  active: boolean
  height: number
  open: boolean
}
const useStyles = makeStyles<Theme, AcccordionStylProps>((theme: Theme) => ({
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 400,
  },
  accordionTopBar: {
    backgroundColor: ({ active }) =>
      active
        ? `${theme.components.accordion.activeBackground}`
        : `${theme.components.accordion.background}`,
    borderTop: `1px solid  ${theme.components.accordion.border}`,
    color: `${theme?.components?.typography?.default}`,
    cursor: 'pointer',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: 'none',
    transition: 'background-color 0.6s ease',
  },

  accordionTitle: {
    fontWeight: 600,
    fontSize: 14,
    textAlign: 'left',
  },
  accordionContent: {
    overflow: ({ active }) => (active ? 'visible' : 'hidden'),
    transition: 'max-height 0.6s ease',
    maxHeight: 0,
  },
  icon: {
    transition: 'transform 0.6s ease',
    transform: ({ active }) => (active ? 'rotate(90deg)' : 'rotate(0deg)'),
  },
}))
