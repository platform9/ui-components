import React from 'react'
import clsx from 'clsx'
import makeStylesWithTheme from 'src/theme-manager/makeStylesWithTheme'

export default function CardBody({ children, className = undefined }) {
  const classes = useStyles()
  return <section className={clsx('card-body', classes.body, className)}>{children}</section>
}

const useStyles = makeStylesWithTheme((theme) => ({
  body: {
    padding: '16px 32px',
  },
}))
