import React from 'react'
import clsx from 'clsx'
import makeStylesWithTheme from 'src/theme-manager/makeStylesWithTheme'

export default function CardFooter({ children, className = undefined }) {
  const classes = useStyles()
  return <footer className={clsx('card-footer', classes.footer, className)}>{children}</footer>
}

const useStyles = makeStylesWithTheme((theme) => ({
  footer: {
    padding: '8px 24px',
  },
}))
