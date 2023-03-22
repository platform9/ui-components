import React, { useState, useRef, PropsWithChildren, useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Theme from '../../theme-manager/themes/model'
import useToggler from '../../hooks/useToggler'
import FontAwesomeIcon from '../FontAwesomeIcon'

interface AccordionProps {
  id: string
  title: string | React.ReactNode
  open?: boolean
  className?: string
}
export default function Accordion({
  id,
  title,
  children,
  open = false,
  className,
  ...props
}: PropsWithChildren<AccordionProps>) {
  const [active, toggleActive] = useToggler(false)
  const [height, setHeight] = useState(0)

  const content = useRef(null)
  const classes = useStyles({ active, height })

  const titleComponent = useMemo(
    () => (typeof title === 'string' ? <p className={classes.accordionTitle}>{title}</p> : title),
    [title],
  )

  useEffect(() => {
    setHeight(open || active ? content.current.scrollHeight : 0) //TODO:CAPI There's a issue here, will need to fix it
  }, [active, children, open])

  return (
    <div className={clsx(classes.accordionContainer, className)} id={id}>
      <div className={clsx(classes.accordionTopBar, 'accordionTopBar')} onClick={toggleActive}>
        {titleComponent}
        <FontAwesomeIcon solid size="xs" className={classes.icon}>
          chevron-right
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
    overflow: 'auto',
    // padding: '0 12px',
    transition: ' max-height 0.6s ease',
    maxHeight: ({ height }) => height,
  },

  icon: {
    transition: 'transform 0.6s ease',
    transform: ({ active }) => (active ? 'rotate(90deg)' : 'rotate(0deg)'),
  },
}))
