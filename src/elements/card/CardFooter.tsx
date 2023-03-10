import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'

export default function CardFooter({ children, className = undefined }) {
  const classes = useStyles({})
  return <footer className={clsx('card-footer', classes.footer, className)}>{children}</footer>
}

const useStyles = makeStyles<Theme>((theme) => ({
  footer: {
    padding: '8px 24px',
  },
}))
