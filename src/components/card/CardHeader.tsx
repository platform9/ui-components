import React from 'react'
import clsx from 'clsx'
import makeStylesWithTheme from 'src/theme-manager/makeStylesWithTheme'
import Text from '../Text'
import Theme from 'src/theme-manager/themes/model'

export default function CardHeader({ children, className = undefined }) {
  const classes = useStyles()
  return (
    <Text variant="subtitle2" className={clsx('card-header', classes.header, className)}>
      {children}
    </Text>
  )
}

const useStyles = makeStylesWithTheme((theme: Theme) => ({
  header: {
    padding: '16px 32px',
    borderBottom: `1px solid ${theme.components.card.border}`,
  },
}))
