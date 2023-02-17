import React from 'react'
import clsx from 'clsx'
import useStylesWithTheme from 'src/theme-manager/useStylesWithTheme'

export default function CardFooter({ children, className = undefined }) {
  const classes = useStylesWithTheme(styleCreator)
  return <footer className={clsx('card-footer', classes.footer, className)}>{children}</footer>
}

const styleCreator = (theme) => ({
  footer: {
    padding: '8px 24px',
  },
})
