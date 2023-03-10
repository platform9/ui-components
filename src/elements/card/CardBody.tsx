import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'

export default function CardBody({ children, className = undefined }) {
  const classes = useStyles({})
  return <section className={clsx('card-body', classes.body, className)}>{children}</section>
}

const useStyles = makeStyles<Theme>((theme) => ({
  body: {
    padding: '16px 32px',
  },
}))
