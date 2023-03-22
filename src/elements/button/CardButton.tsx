import React from 'react'

import Theme from '../../theme-manager/themes/model'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { ButtonProps } from '@material-ui/core'
import Text from '../../elements/Text'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import { hexToRgbaCss } from '../../utils/colorHelpers'

interface Props extends Omit<ButtonProps, 'variant' | 'size'> {
  disabled?: boolean
  icon?: string
  title?: string
  message?: string
}

const CardButton = ({
  onClick,
  title,
  message,
  icon = undefined,
  disabled = false,
  className = undefined,
  ...props
}: Props) => {
  const classes = useStyles({})
  return (
    <button
      className={clsx(classes.button, className, { disabled })}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      <FontAwesomeIcon className={classes.icon} solid>
        {icon}
      </FontAwesomeIcon>
      <Text variant="subtitle2" className={classes.title}>
        {title}
      </Text>
      <Text variant="body1" className={classes.body}>
        {message}
      </Text>
    </button>
  )
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  button: {
    boxSizing: 'border-box',
    padding: '16px 16px 16px 24px',
    textAlign: 'start',

    display: 'grid',
    alignItems: 'center',
    justifyItems: 'start',
    gridTemplateAreas: `
      "card-button-icon card-button-title"
      "card-button-icon card-button-body"
    `,
    gridTemplateColumns: 'max-content 1fr',
    columnGap: 16,

    borderRadius: 4,
    border: `1px solid ${theme.components.iconButton.border}`,
    backgroundColor: theme.components.iconButton.background,
    // color: theme.components.iconButton.color,
    cursor: 'pointer',
    transition: 'all .2s ease',

    '&:hover': {
      backgroundColor: theme.components.iconButton.activeBackground,
      borderColor: theme.components.iconButton.activeBorder,
      // color: theme.components.iconButton.activeColor,
    },
    '&.disabled': {
      cursor: 'not-allowed',
      backgroundColor: theme.components.iconButton.disabledBackground,
      borderColor: theme.components.iconButton.disabledBorder,
      // color: theme.components.iconButton.disabledColor,
    },
  },
  icon: {
    fontSize: 18,
    width: 32,
    height: 32,

    borderRadius: '100%',

    display: 'grid',
    gridArea: 'card-button-icon',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: hexToRgbaCss(theme.components.button.primary.background, 0.1),
    color: theme.components.button.primary.background,
  },
  title: {
    gridArea: 'card-button-title',
  },
  body: {
    gridArea: 'card-button-body',
    color: theme.components.typography.passive,
  },
}))

export default CardButton
