import React from 'react'
import clsx from 'clsx'
import useStylesWithTheme from 'src/theme-manager/useStylesWithTheme'

export default function CardBody({ children, className = undefined }) {
  const classes = useStylesWithTheme(styleCreator)
  return <section className={clsx('card-body', classes.body, className)}>{children}</section>
}

const styleCreator = (theme) => ({
  body: {
    padding: '16px 32px',
  },
})
