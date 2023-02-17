import React, { useState } from 'react'
import Theme from 'src/theme-manager/themes/model'
import useStylesWithTheme from 'src/theme-manager/useStylesWithTheme'
import clsx from 'clsx'

// TEMP component for testing
export interface ButtonProps {
  className?: any
  label?: string
}

export default function Button({ className, label = 'Click Me' }: ButtonProps) {
  const [isBlue, setIsBlue] = useState(true)
  const classes = useStylesWithTheme(styleCreator, { isBlue })
  const onClick = () => setIsBlue(!isBlue)

  return (
    <button type="button" onClick={onClick} className={clsx(classes.button, className)}>
      {label}
    </button>
  )
}

const styleCreator = (theme: Theme) => ({
  button: {
    borderRadius: 3,
    backgroundColor: theme.palette.green[300],
    // color: ({ isBlue }) => (isBlue ? theme.palette.blue['500'] : theme.palette.pink['300']),
    fontSize: '16px',
    // backgroundColor: theme.palette.blue['500'],
  },
})
