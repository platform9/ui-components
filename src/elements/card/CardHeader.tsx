import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import Text from '../Text'

export default function CardHeader({ children, className = undefined }) {
  const classes = useStyles({})
  return (
    <Text variant="subtitle2" className={clsx('card-header', classes.header, className)}>
      {children}
    </Text>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  header: {
    padding: '16px 32px',
    borderBottom: `1px solid ${theme.components.card.border}`,
  },
}))
