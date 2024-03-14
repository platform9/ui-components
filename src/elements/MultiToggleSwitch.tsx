import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Theme from '../theme-manager/themes/model'
import Text from './Text'

interface MultiToggleSwitchProps {
  options: Array<{ label: string; value: unknown }>
  onChange?: (value) => void
  className?: string
}

export default function MultiToggleSwitch({
  options = [],
  onChange,
  className,
}: MultiToggleSwitchProps) {
  const classes = useStyles()
  const [activeOption, setActiveOption] = useState(options[0]?.value)

  const onClick = (value) => {
    setActiveOption(value)
    onChange && onChange(value)
  }

  return (
    <div className={clsx(classes.toggleSwitch, className)}>
      {options.map(({ label, value }) => (
        <div
          className={clsx(classes.option, activeOption === value ? classes.activeOption : '')}
          onClick={() => onClick(value)}
        >
          <Text variant="caption1">{label}</Text>
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
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
  },
  option: {
    cursor: 'pointer',
    padding: theme.spacing(0, 1.5),
  },
  activeOption: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '18px',
    color: theme.palette.common.white,
    '& span': {
      color: theme.palette.common.white,
    },
  },
}))
