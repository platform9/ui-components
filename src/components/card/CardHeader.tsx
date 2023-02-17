import React from 'react'
import clsx from 'clsx'
import useStylesWithTheme from 'src/theme-manager/useStylesWithTheme'
import Text from '../Text'

export default function CardHeader({ children, className = undefined }) {
  const classes = useStylesWithTheme(styleCreator)
  return (
    <Text variant="subtitle2" className={clsx('card-header', classes.header, className)}>
      {children}
    </Text>
  )
}

const styleCreator = (theme) => ({
  header: {
    padding: '16px 32px',
    borderBottom: `1px solid ${theme.components.card.border}`,
  },
})
