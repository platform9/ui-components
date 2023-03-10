import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import generateTestId from 'src/utils/test-helpers'
import Theme from 'src/theme-manager/themes/model'

interface Props {
  displayName: string
  diameter?: number
  fontSize?: number
  onClick?: any
  className?: string
}

interface StyleProps extends Props {
  readOnly: boolean
}

const useStyles = makeStyles<Theme, Partial<StyleProps>>((theme: Theme) => ({
  avatar: {
    borderRadius: '50%',
    border: `1px solid ${theme.components.iconButton.border}`,
    backgroundColor: theme.components.iconButton.background,
    color: theme.components.iconButton.color,
    transition: 'all .2s ease',

    '&:not(.read-only):hover, &.read-only': {
      backgroundColor: theme.components.iconButton.activeBackground,
      borderColor: theme.components.iconButton.activeBorder,
      color: theme.components.iconButton.activeColor,
    },
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    overflow: 'hidden',
    lineHeight: ({ fontSize }) => fontSize,
    height: ({ diameter }) => diameter,
    width: ({ diameter }) => diameter,
    fontSize: ({ fontSize }) => fontSize,
    cursor: ({ readOnly }) => (!readOnly ? 'pointer' : 'default'),
  },
}))

const Avatar = ({ displayName = '', diameter = 48, fontSize = 18, onClick, className }: Props) => {
  const readOnly = !onClick
  const { avatar } = useStyles({ diameter, fontSize, readOnly })

  return (
    <div
      data-testid={generateTestId('user', 'menu')}
      className={clsx(avatar, className, { 'read-only': readOnly })}
      onClick={onClick}
    >
      {displayName.charAt(0)}
    </div>
  )
}

export default Avatar
