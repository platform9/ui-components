import React, { FC, PropsWithChildren } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import clsx from 'clsx'
import Card from '../elements/card'
import { CardProps } from '../elements/card/Card'

const useStyles = makeStyles<Theme, Partial<SelectableCardProps>>((theme) => ({
  selectableCard: {
    cursor: 'pointer',
    border: ({ active }) =>
      active
        ? `1px solid ${theme.components.card.activeBorder}`
        : `1px solid ${theme.components.card.border}`,
    backgroundColor: ({ active }) =>
      active ? theme.components.card.activeBackground : theme.components.card.background,
    '&:hover': {
      border: `1px solid ${theme.components.card.activeBorder}`,
    },
  },
}))

const SelectableCard: FC<PropsWithChildren<SelectableCardProps>> = (props) => {
  const { id, onClick, children, className = undefined, active, ...rest } = props
  const classes = useStyles({ active })

  const handleClick = () => {
    if (onClick) return onClick(id)
  }
  return (
    <div onClick={handleClick}>
      <Card {...rest} className={clsx(classes.selectableCard, className)}>
        {children}
      </Card>
    </div>
  )
}

interface SelectableCardProps extends CardProps {
  id: any
  onClick: any
  active?: boolean
  className?: string
}

export default SelectableCard
