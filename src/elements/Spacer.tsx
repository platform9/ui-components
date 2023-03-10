import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Theme from 'src/theme-manager/themes/model'
import React from 'react'

interface SpacerProps {
  className?: string
  height?: number
}

interface StyleProps {
  height: number
}
const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  spacer: {
    height: ({ height }) => height,
  },
}))

export default function Spacer({ className, height = 16 }: SpacerProps) {
  const classes = useStyles({ height })
  return <div className={clsx(classes.spacer, className)}></div>
}
