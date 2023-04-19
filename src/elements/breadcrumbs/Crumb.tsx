import React from 'react'
import { isNil } from 'ramda'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'

import Text, { TextProps } from '../../elements/Text'
import SimpleLink from '../../components/SimpleLink'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

interface CrumbProps {
  name: string
  path: string
  active: boolean
  icon: string
  leftIcon?: React.ReactNode
  disabled?: boolean
  textVariant?: TextProps['variant']
}

export default function Crumb({
  icon,
  name,
  path,
  active,
  leftIcon,
  textVariant,
  disabled = false,
}: CrumbProps) {
  const isLink = !isNil(path) && !active
  const classes = useStyles({
    active,
    disabled,
    selectable: isLink,
    hideEllipsis: !!leftIcon || active,
  })
  const textContent = (
    <Text variant={textVariant} noWrap className={clsx('breadcrumb-text', classes.crumbText)}>
      {leftIcon && leftIcon}
      <span>{name}</span>
    </Text>
  )

  return (
    <li className={classes.breadcrumbItem}>
      {isLink ? (
        <SimpleLink src={path} textDecoration="none" className={classes.crumbLink}>
          {textContent}
        </SimpleLink>
      ) : (
        textContent
      )}
      {!active && (
        <FontAwesomeIcon solid className={classes.icon}>
          {icon}
        </FontAwesomeIcon>
      )}
    </li>
  )
}

interface StyleProps {
  active: boolean
  disabled: boolean
  selectable: boolean
  hideEllipsis: boolean
}
type BreadcrumbKeys = keyof Theme['components']['breadcrumb']
const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  breadcrumbItem: {
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'start',
    gap: 8,
    padding: 0,
    margin: 0,
    gridTemplateColumns: ({ hideEllipsis }) =>
      hideEllipsis ? 'max-content max-content' : 'minmax(36px, max-content) max-content',
    cursor: ({ selectable }) => (selectable ? 'pointer' : 'unset'),

    '&:hover .breadcrumb-text': {
      backgroundColor: `${theme.components.breadcrumb.hoverBackground} !important`,
    },
  },
  icon: {
    fontSize: 14,
    color: theme.components.breadcrumb.text,
    height: 12,
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  crumbLink: {
    display: 'grid',
    '& .simple-link-text': {
      display: 'grid',
    },
  },
  crumbText: {
    fontWeight: 600,
    width: '100%',
    padding: 8,
    borderRadius: 4,
    boxSizing: 'border-box',
    lineHeight: 1.25,
    textTransform: 'capitalize',
    color: ({ active, disabled }) => {
      const key: BreadcrumbKeys = disabled ? 'disabledText' : active ? 'activeText' : 'text'
      return theme.components.breadcrumb[key]
    },
    '& > i': {
      marginRight: 8,
    },
  },
}))
