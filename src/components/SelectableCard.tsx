import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { FC, PropsWithChildren } from 'react'
import Card from '../elements/card'
import { CardProps } from '../elements/card/Card'
import Tooltip from '../elements/tooltip'
import Theme from '../theme-manager/themes/model'
import FontAwesomeIcon from './FontAwesomeIcon'

const useStyles = makeStyles<Theme, any>((theme) => ({
  selectableCard: {
    position: 'relative',
  },
  card: {
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
    border: ({ active }) =>
      active
        ? `1px solid ${theme.components.card.activeBorder}`
        : `1px solid ${theme.components.card.border}`,
    backgroundColor: ({ active }) =>
      active ? theme.components.card.activeBackground : theme.components.card.background,
    '&:hover': ({ active }) =>
      active
        ? `1px solid ${theme.components.card.activeBorder}`
        : `1px solid ${theme.components.card.border}`,
    opacity: ({ disabled }) => (disabled ? 0.4 : 1),
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
    disabled = false,
    disabledMsg,
    ...rest
  } = props
  const classes = useStyles({ active, disabled })

  const handleClick = () => {
    if (onClick) return onClick(id)
  }

  const card = (
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
  return disabled && disabledMsg ? <Tooltip message={disabledMsg}>{card}</Tooltip> : <>{card}</>
}

interface SelectableCardProps extends CardProps {
  id: any
  onClick: any
  active?: boolean
  disabled?: boolean
  disabledMsg?: string
  className?: string
  showCheckmarkIcon?: boolean
}

export default SelectableCard
