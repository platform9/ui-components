import { IRouterLink } from '../../plugins/model'
import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import clsx from 'clsx'
import Tooltip from '../tooltip'
import Text from '../Text'
import generateTestId from '../../utils/test-helpers'
import { hexToRgbaCss } from '../../utils/colorHelpers'

interface Props extends IRouterLink {
  isActive?: boolean
  tooltip?: boolean
  open?: boolean
  compact?: boolean
  activeDisplayType?: 'background' | 'bar'
  className?: string
  tooltipProps?: { [key: string]: any }
}

export default function NavItem({
  name,
  link,
  icon,
  className = undefined,
  open = false,
  isActive = false,
  compact = false,
  tooltip = false,
  tooltipProps = {},
  activeDisplayType = 'background',
}: Props) {
  const classes = useStyles({ isActive, compact, activeDisplayType })

  return (
    <Link to={link.path}>
      <li className={clsx(classes.navItem, className)}>
        <Tooltip message={tooltip ? name : ''} {...tooltipProps}>
          {icon && (
            <div className={clsx(classes.navIcon)}>
              <FontAwesomeIcon
                data-testid={generateTestId(name)}
                className="nav-icon"
                title={name}
                size="lg"
              >
                {icon}
              </FontAwesomeIcon>
            </div>
          )}
          {open && (
            <Text
              className={clsx('nav-text', classes.navText)}
              data-testid={generateTestId(name)}
              variant={compact ? 'sidenav' : 'subtitle2'}
            >
              {name}
            </Text>
          )}
        </Tooltip>
      </li>
    </Link>
  )
}

interface StyleProps {
  isActive: Props['isActive']
  compact: Props['compact']
  activeDisplayType: Props['activeDisplayType']
}

const getBackgroundImage = (isActive, displayType, sidebarColors) => {
  if (displayType === 'background' && isActive) {
    return `linear-gradient(to right, ${hexToRgbaCss(
      sidebarColors.activeBackground,
      0.5,
    )} 0%, ${hexToRgbaCss(sidebarColors.activeBackground, 0)} 100%)`
  }
  if (displayType === 'bar' && isActive) {
    return `linear-gradient(${sidebarColors.activeBackground}, ${sidebarColors.activeBackground})`
  }
  return 'unset'
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  navItem: {
    transition: 'background .2s ease',
    position: 'relative',
    height: ({ compact }) => (compact ? 40 : 48),
    display: 'grid',
    alignItems: 'center',
    '& .nav-text, & .nav-icon': {
      transition: 'color .2s ease',
    },
    '&:hover .nav-text, &:hover .nav-icon': {
      color: theme.components.sidebar.hoverText,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: ({ activeDisplayType }) => (activeDisplayType === 'bar' ? 'unset' : 0),
      top: ({ activeDisplayType }) => (activeDisplayType === 'bar' ? '50%' : 0),
      left: 0,
      right: ({ activeDisplayType }) => (activeDisplayType === 'background' ? 0 : 'unset'),
      width: ({ activeDisplayType }) => (activeDisplayType === 'bar' ? 3 : 'unset'),
      height: ({ activeDisplayType }) => (activeDisplayType === 'bar' ? 24 : 'unset'),
      transform: ({ activeDisplayType }) =>
        activeDisplayType === 'bar' ? 'translate(0px, -50%)' : 'unset',
      backgroundImage: ({ isActive, activeDisplayType }) =>
        getBackgroundImage(isActive, activeDisplayType, theme.components.sidebar),
    },
    '&:after': {
      content: ({ activeDisplayType }) => (activeDisplayType === 'bar' ? '""' : ''),
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      width: 1,
      backgroundColor: theme.components.sidebar.border,
    },
  },
  navIcon: {
    minWidth: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ({ isActive }) => theme.components.sidebar?.[isActive ? 'activeIcon' : 'text'],
    '& > i': {
      width: '23px',
      height: '18.5px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: ({ isActive }) => theme.components.sidebar?.[isActive ? 'activeIcon' : 'text'],
    },
  },
  navText: {
    color: ({ isActive }) => theme.components.sidebar?.[isActive ? 'activeText' : 'text'],
  },
}))
