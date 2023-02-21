import React, { useState } from 'react'
import Theme from 'src/theme-manager/themes/model'
import makeStylesWithTheme from 'src/theme-manager/makeStylesWithTheme'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
// TEMP component for testing
export interface ButtonProps {
  className?: any
  label?: string
}

const useStyles = makeStylesWithTheme((theme: Theme) => ({
  button: {
    borderRadius: 3,
    backgroundColor: theme.palette.green[400],
    color: theme.palette.grey[400],
    fontSize: '16px',
  },
}))

export default function Button({ className, label = 'Click Me' }: ButtonProps) {
  const [isBlue, setIsBlue] = useState(true)
  // const classes = useStyles({ isBlue })
  const classes = useStyles()
  const onClick = () => setIsBlue(!isBlue)

  return (
    <button type="button" onClick={onClick} className={clsx(classes.button, className)}>
      {label}
    </button>
  )
}
