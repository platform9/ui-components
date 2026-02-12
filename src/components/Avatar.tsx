import React from 'react'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import Text from '../elements/Text'
import generateTestId from '../utils/test-helpers'
import Theme from '../theme-manager/themes/model'

interface Props {
  displayName: string
  diameter?: number
  fontSize?: number
  onClick?: any
  className?: string
}

interface StyledProps {
  diameter: number
  fontSize: number
  readOnly: boolean
}

const StyledAvatar = styled(Text)<StyledProps>(({ theme, diameter, fontSize, readOnly }) => ({
  borderRadius: '50%',
  border: `1px solid ${(theme as Theme).components.iconButton.border}`,
  backgroundColor: (theme as Theme).components.iconButton.background,
  color: (theme as Theme).components.iconButton.color,
  transition: 'all .2s ease',

  '&:not(.read-only):hover, &.read-only': {
    backgroundColor: (theme as Theme).components.iconButton.activeBackground,
    borderColor: (theme as Theme).components.iconButton.activeBorder,
    color: (theme as Theme).components.iconButton.activeColor,
  },
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  overflow: 'hidden',
  lineHeight: fontSize,
  height: diameter,
  width: diameter,
  fontSize: fontSize,
  cursor: readOnly ? 'default' : 'pointer',
}))

const Avatar = ({ displayName = '', diameter = 48, fontSize = 18, onClick, className }: Props) => {
  const readOnly = !onClick

  return (
    <StyledAvatar
      component="div"
      variant="body1"
      data-testid={generateTestId('user', 'menu')}
      className={clsx(className, { 'read-only': readOnly })}
      onClick={onClick}
      diameter={diameter}
      fontSize={fontSize}
      readOnly={readOnly}
    >
      {displayName.charAt(0)}
    </StyledAvatar>
  )
}

export default Avatar
