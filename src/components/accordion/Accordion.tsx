import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import useToggler from '../../hooks/useToggler'
import Theme from '../../theme-manager/themes/model'
import FontAwesomeIcon from '../FontAwesomeIcon'

interface AccordionProps {
  id: string
  title: string | React.ReactNode
  open?: boolean
  className?: string
  onClick?: () => void
  icon?: string
}
export default function Accordion({
  id,
  title,
  children,
  open = false,
  className,
  onClick,
  icon = 'chevron-right',
  ...props
}: PropsWithChildren<AccordionProps>) {
  const [active, toggleActive] = useToggler(false)
  const [height, setHeight] = useState(0)

  const content = useRef<HTMLDivElement>(null)
  const classes = useStyles({ active, open, height })

  const titleComponent = useMemo(
    () => (typeof title === 'string' ? <p className={classes.accordionTitle}>{title}</p> : title),
    [title],
  )

  useEffect(() => {
    if (content.current) {
      setHeight(open || active ? content.current.scrollHeight : 0)
    }
  }, [active, children, open])

  const handleToggleClick = () => {
    onClick ? onClick() : toggleActive()
  }

  return (
    <div className={clsx(classes.accordionContainer, className)} id={id}>
      <div className={clsx(classes.accordionTopBar, 'accordionTopBar')} onClick={handleToggleClick}>
        {titleComponent}
        <FontAwesomeIcon solid size="xs" className={clsx(classes.icon, 'toggleIcon')}>
          {icon}
        </FontAwesomeIcon>
      </div>

      <div ref={content} className={clsx(classes.accordionContent, 'accordianContent')} {...props}>
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
    overflow: 'hidden',
    transition: 'max-height 0.6s ease',
    maxHeight: ({ active, open }) => (active || open ? '1000px' : '0'), // Use a sufficiently large value for expanded state
  },

  icon: {
    transition: 'transform 0.6s ease',
    transform: ({ active }) => (active ? 'rotate(90deg)' : 'rotate(0deg)'),
  },
}))
