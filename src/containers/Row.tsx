import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'

interface StyleProps {
  padding?: number
  minItemWidth?: string
  gap?: number
  className?: string
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  rowLayout: {
    display: 'grid',
    gridTemplateColumns: ({ minItemWidth }) => `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
    gap: ({ gap }) => gap,
    padding: ({ padding }) => padding,
    alignItems: 'baseline',
  },
}))

export default function Row({
  children,
  padding = 0,
  minItemWidth = '400',
  gap = 8,
  className,
}: PropsWithChildren<StyleProps>) {
  const classes = useStyles({ padding, minItemWidth, gap })
  return <div className={clsx(classes.rowLayout, className)}>{children}</div>
}
