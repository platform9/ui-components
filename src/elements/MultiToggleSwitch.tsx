import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Theme from '../theme-manager/themes/model'
import Text from './Text'

interface MultiToggleSwitchProps {
  options: Array<{ label: string; value: unknown }>
  value: unknown
  onClick: (value) => void
  className?: string
  activeOptionColor?: string
}

export default function MultiToggleSwitch({
  options = [],
  value,
  onClick,
  className,
  activeOptionColor,
}: MultiToggleSwitchProps) {
  const classes = useStyles({ activeOptionColor })

  return (
    <div className={clsx(classes.toggleSwitch, className)}>
      {options.map((option) => (
        <div
          key={option.label}
          className={clsx(
            classes.option,
            option.value === value ? classes.activeOption : '',
            'option',
          )}
          onClick={() => onClick(option.value)}
        >
          <Text variant="caption1">{option.label}</Text>
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles<Theme, { activeOptionColor?: string }>((theme) => ({
  toggleSwitch: {
    width: 'max-content',
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    borderRadius: '14px',
    height: '28px',
    padding: theme.spacing(0, 1),
    border: `1px solid ${theme.palette.grey[200]}`,
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  option: {
    cursor: 'pointer',
    padding: theme.spacing(0, 1.5),
  },
  activeOption: {
    backgroundColor: ({ activeOptionColor }) =>
      activeOptionColor ? activeOptionColor : theme.palette.primary.main,
    borderRadius: '18px',
    color: theme.palette.common.white,
    '& span': {
      color: theme.palette.common.white,
    },
  },
}))
