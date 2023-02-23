import React from 'react'
import clsx from 'clsx'
import makeStylesWithTheme from 'src/theme-manager/makeStylesWithTheme'
import Theme from 'src/theme-manager/themes/model'

export default function CardFooter({ children, className = undefined }) {
  const classes = useStyles()
  return <footer className={clsx('card-footer', classes.footer, className)}>{children}</footer>
}

const useStyles = makeStylesWithTheme((theme: Theme) => ({
  footer: {
    padding: '8px 24px',
  },
}))
