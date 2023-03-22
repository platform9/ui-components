import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import React, { PropsWithChildren } from 'react'

interface StyleProps {
  padding?: string | number
  gap?: string | number
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  columnLayout: {
    display: 'grid',
    gridAutoFlow: 'row',
    gap: ({ gap }) => gap,
    padding: ({ padding }) => padding,
  },
}))

export default function Column({
  children,
  gap = '8px',
  padding = '0',
}: PropsWithChildren<StyleProps>) {
  const classes = useStyles({ padding, gap })
  return <div className={classes.columnLayout}>{children}</div>
}
