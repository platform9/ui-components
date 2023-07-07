import React, { FC, PropsWithChildren } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import clsx from 'clsx'
import Card from '../elements/card'
import { CardProps } from '../elements/card/Card'
import FontAwesomeIcon from './FontAwesomeIcon'

const useStyles = makeStyles<Theme, any>((theme) => ({
  selectableCard: {
    position: 'relative',
  },
  card: {
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
  circle: {
    background: theme.components.card.activeBorder,
    position: 'absolute',
    right: '-7px',
    top: '-8px',
    borderRadius: '50%',
    width: '27px',
    height: '27px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    color: 'white',
  },
}))

const SelectableCard: FC<PropsWithChildren<SelectableCardProps>> = (props) => {
  const {
    id,
    onClick,
    children,
    active = false,
    className = undefined,
    showCheckmarkIcon = false,
    ...rest
  } = props
  const classes = useStyles({ active })

  const handleClick = () => {
    if (onClick) return onClick(id)
  }
  return (
    <div className={classes.selectableCard} onClick={handleClick}>
      <Card {...rest} className={clsx(classes.card, className)}>
        {children}
      </Card>
      {active && showCheckmarkIcon && (
        <div className={classes.circle}>
          <FontAwesomeIcon className={classes.checkIcon} solid size="sm">
            check
          </FontAwesomeIcon>
        </div>
      )}
    </div>
  )
}

interface SelectableCardProps extends CardProps {
  id: any
  onClick: any
  active?: boolean
  className?: string
  showCheckmarkIcon?: boolean
}

export default SelectableCard
