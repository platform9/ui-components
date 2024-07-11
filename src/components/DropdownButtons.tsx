import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { useState } from 'react'
import Text from 'src/elements/Text'
import Tooltip from 'src/elements/tooltip/Tooltip'
import Theme from 'src/theme-manager/themes/model'
import ExternalLink from './ExternalLink'
import FontAwesomeIcon from './FontAwesomeIcon'

interface IButton {
  label: string
  icon: string
  onClick?: () => void
  externalLink?: string
  disabled?: boolean
  tooltipMsg?: string
}

const DropdownButton = ({
  label,
  icon,
  onClick,
  externalLink,
  disabled = false,
  tooltipMsg,
}: IButton) => {
  const classes = useStyles({ disabled })

  // Prevent default onClick if the button is disabled
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    onClick && onClick()
  }

  return externalLink ? (
    <ExternalLink className={classes.dropdownButton} url={externalLink}>
      <FontAwesomeIcon className={clsx(classes.text, classes.icon)} size="md">
        {icon}
      </FontAwesomeIcon>
      <Text variant="caption1" className={classes.text}>
        {label}
      </Text>
    </ExternalLink>
  ) : (
    <Tooltip message={tooltipMsg} align={{ vertical: 'top', horizontal: 'middle' }}>
      <div className={clsx(classes.dropdownButton, 'dropdown-button')} onClick={handleClick}>
        <FontAwesomeIcon className={clsx(classes.text, classes.icon)} size="md">
          {icon}
        </FontAwesomeIcon>
        <Text variant="caption1" className={classes.text}>
          {label}
        </Text>
      </div>
    </Tooltip>
  )
}

interface DropdownButtonsProps {
  buttons: IButton[]
  label?: string
  className?: string
}

// May be possible to combine this component with the ActionsDropdown component
// in the future, though that one is fairly more complicated
export default function DropdownButtons({
  label = 'More Actions',
  buttons = [],
  className,
}: DropdownButtonsProps) {
  const classes = useStyles({})
  const [isOpen, setOpen] = useState(false)

  return (
    <div className={clsx(classes.dropdownContainer, className)}>
      <div
        className={clsx(classes.dropdownLabel, 'dropdown-label')}
        onClick={() => setOpen(!isOpen)}
      >
        <Text variant="caption1" className={classes.text}>
          {label}
        </Text>
        <FontAwesomeIcon className={classes.text} solid size="sm">
          {isOpen ? 'caret-up' : 'caret-down'}
        </FontAwesomeIcon>
      </div>
      {isOpen && (
        <div
          className={clsx(classes.dropdownButtons, 'dropdown-buttons')}
          onMouseLeave={() => setOpen(false)}
        >
          {buttons.map(({ label, ...buttonProps }) => {
            return <DropdownButton {...buttonProps} key={label} label={label} />
          })}
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles<Theme, { disabled?: boolean }>((theme) => ({
  dropdownContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  dropdownLabel: {
    display: 'inline-grid',
    gridTemplateColumns: 'auto max-content',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    background: theme.components.button.secondary.background,
    border: `1px solid ${theme.components.button.secondary.border}`,
    cursor: 'pointer',
    borderRadius: 4,
  },
  text: {
    color: theme.components.dropdown.color,
  },
  dropdownButtons: {
    position: 'absolute',
    top: 40,
    background: theme.components.button.secondary.background,
    border: `1px solid ${theme.components.button.secondary.border}`,
    borderRadius: 4,
    display: 'grid',
    minWidth: '100%',
    width: 'fit-content',
    zIndex: 100,
    right: 0,
  },
  dropdownButton: {
    display: 'grid',
    gridTemplateColumns: '18px auto',
    alignItems: 'center',
    padding: '8px 16px',
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
    '&:hover': {
      textDecoration: 'none',
      background: theme.components.dropdown.selectedBackground,
      cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
      opacity: ({ disabled }) => (disabled ? 0.5 : 1),
    },
    '& > span': {
      display: 'grid',
      gridTemplateColumns: '18px auto',
      padding: '8px 16px',
      alignItems: 'center',
      gap: 8,
      cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
      '& > span': {
        whiteSpace: 'nowrap',
      },
    },
  },
  icon: {
    marginTop: 2,
    fontWeight: 400,
  },
}))
