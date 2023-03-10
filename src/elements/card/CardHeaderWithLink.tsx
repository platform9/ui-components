import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import Text from '../Text'

export default function CardHeaderWithLink({
  children,
  className = undefined,
  linkComponent = undefined,
}) {
  const classes = useStyles({})
  return (
    <div className={clsx('card-header', classes.header)}>
      <Text variant="subtitle2" className={className}>
        {children}
      </Text>
      {linkComponent && linkComponent}
    </div>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  header: {
    padding: '16px 32px',
    borderBottom: `1px solid ${theme.components.card.border}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))
