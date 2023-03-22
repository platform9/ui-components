import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Theme from '../theme-manager/themes/model'
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    height: 1,
    background: theme.components.card.border,
    border: 0,
    margin: theme.spacing(3, 0),
  },
}))

interface DividerProps {
  className?: string
}

export default function Divider({ className }: DividerProps) {
  const classes = useStyles({})
  return <hr className={clsx(classes.divider, className)}></hr>
}
