import React from 'react'
import clsx from 'clsx'
import makeStylesWithTheme from 'src/theme-manager/makeStylesWithTheme'
import Text from '../Text'

const useStyles = makeStylesWithTheme((theme) => ({
  header: {
    padding: '16px 32px',
    borderBottom: `1px solid ${theme.components.card.border}`,
    color: 'red',
  },
}))

export default function CardHeader({ children, className = undefined }) {
  const classes = useStyles()
  return (
    <Text variant="subtitle2" className={clsx('card-header', classes.header, className)}>
      {children}
    </Text>
  )
}
