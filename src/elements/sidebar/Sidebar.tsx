import React, { FC, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { prop, partition } from 'ramda'
import { makeStyles } from '@material-ui/styles'
import ListMenu from '../menu/ListMenu'
import MenuItem from '../menu/MenuItem'
import { topMiddle, bottomRight } from '../menu/defaults'

import { pathStrOr } from '../../utils/fp'
// import { clientActions, clientStoreKey, ClientState } from 'core/client/clientReducers'
// import { sessionStoreKey, SessionState } from 'core/session/sessionReducers'
import FrameContext from '../../providers/frame-provider'
import useToggler from '../../hooks/useToggler'
import usePluginRouter from '../../hooks/usePluginRouter'
import Theme from '../../theme-manager/themes/model'
import { matchesCurrentPath } from '../../plugins/route-helpers'
import Text from '../Text'
import Tooltip from '../tooltip'
import IconButton from '../button/IconButton'
import clsx from 'clsx'
import NavItem from './NavItem'
import NavPane from './NavPane'
import SpinLogo from './SpinLogo'
import generateTestId from '../../utils/test-helpers'
// import { trackEvent } from '../../utils/tracking'

interface Props {
  setPluginId: (id: string) => void
}
const iconProps = {
  solid: true,
}

// TODO setup reducers to be used in the consuming app for session and client
const sidebarState = 'expanded'
const features = {}
const sidebarPane: any = 'default'

const sidebarPaneRef = React.createRef<HTMLDivElement>()
const Sidebar: FC<Props> = ({ setPluginId }) => {
  // const dispatch = useDispatch()
  const [menuOpen, toggleMenuOpen] = useToggler(false)
  // const { features = {} } = useSelector(prop<string, SessionState>(sessionStoreKey))
  // const { frame: { sidebarState = 'expanded', sidebarPane = 'default' } = {} } = useSelector(
  //   prop<string, ClientState>(clientStoreKey),
  // )
  const drawerOpen = sidebarState === 'expanded'
  const version = pathStrOr('4', 'releaseVersion', features)
  const { sections, currentSection, currentLink, location, currentOptions } = usePluginRouter()
  const { singlePane = false } = currentOptions
  const classes = useStyles({ drawerOpen, singlePane })
  const { pathname, hash } = location
  const currentPath = `${pathname}${hash}`
  const [currentSectionBottomLinks, currentSectionLinks] = useMemo(
    () => partition((link) => link.isBottomLink, currentSection.links),
    [currentSection],
  )

  // const toggleDrawer = useCallback(() => {
  //   dispatch(clientActions.setSidebarState(sidebarState === 'expanded' ? 'collapsed' : 'expanded'))
  // }, [sidebarState])

  const { setFrameContainerRef } = React.useContext(FrameContext)
  useEffect(() => {
    setFrameContainerRef({
      sidebarPaneContainer: sidebarPaneRef.current,
    })
  }, [])

  const handleChange = useCallback(
    (newPluginId) => {
      setPluginId(newPluginId)
      // trackEvent('Changed Application Plugin', {
      //   application: newPluginId,
      // })
      toggleMenuOpen()
    },
    [setPluginId],
  )
  const isPluginSelectorActive = Boolean(menuOpen)
  const menuOffset = useMemo(
    () => ({
      vertical: 8,
      horizontal: drawerOpen ? -(288 / 2) : -(72 / 2),
    }),
    [drawerOpen],
  )
  return (
    <>
      <aside
        className={clsx(classes.customNav, {
          [classes.customNavWidth]: sidebarPane === 'custom',
          [classes.openPane]: sidebarPane === 'custom',
          [classes.hiddenPane]: sidebarPane !== 'custom',
        })}
      >
        <div className="sidebarPanePortal" ref={sidebarPaneRef} />
      </aside>
      <aside
        className={clsx(classes.customNav, classes.nav, {
          [classes.openPane]: sidebarPane === 'default',
          [classes.hiddenPane]: sidebarPane !== 'default',
        })}
      >
        <ListMenu
          data-testid={generateTestId('plugin', 'menu')}
          id="plugin-menu"
          list={sections}
          onClose={toggleMenuOpen}
          open={isPluginSelectorActive}
          offset={menuOffset}
          align={bottomRight.align}
          origin="left top"
          className={classes.pluginMenuContainer}
          render={(item) => (
            <MenuItem
              key={item.id}
              textVariant="subtitle2"
              onClick={() => handleChange(item.id)}
              className={classes.pluginMenuItem}
              iconProps={iconProps}
              icon={typeof item.icon === 'string' ? item.icon : undefined}
            >
              {typeof item.icon !== 'string' ? item.icon : null}
              {item.name}
            </MenuItem>
          )}
          anchor={
            <div
              className={clsx(classes.pluginSelector, { active: isPluginSelectorActive })}
              onClick={toggleMenuOpen}
            >
              <SpinLogo active={isPluginSelectorActive} />
              <Text variant="subtitle1" className={classes.pluginTitle}>
                {currentSection.name}
              </Text>
            </div>
          }
        />
        {sidebarPane !== 'custom' && (
          <IconButton
            data-testid={generateTestId('side', 'bar', 'arrow')}
            className={classes.toggleCaret}
            // onClick={toggleDrawer}
            icon={drawerOpen ? 'chevron-left' : 'chevron-right'}
            size="md"
            solid
          />
        )}
        <NavPane
          className={classes.primaryPane}
          bottomContent={currentSectionBottomLinks.map((bLink, idx) => (
            <NavItem
              {...bLink}
              key={idx}
              isActive={matchesCurrentPath(currentPath, bLink.link)}
              open={singlePane && drawerOpen}
              tooltip
              tooltipProps={{ className: classes.navText }}
            />
          ))}
        >
          {currentSectionLinks?.map((navItem, idx) => (
            <NavItem
              {...navItem}
              key={idx}
              isActive={matchesCurrentPath(currentPath, navItem?.link)}
              open={singlePane && drawerOpen}
              tooltip
              tooltipProps={{ className: classes.navText }}
            />
          ))}
        </NavPane>
        {drawerOpen && !singlePane && (
          <NavPane
            className={classes.secondaryPane}
            title={currentLink?.name}
            bottomContent={[
              <li key={version}>
                <Tooltip
                  className={classes.navText}
                  message={version}
                  align={topMiddle.align}
                  offset={topMiddle.offset}
                >
                  <Text variant="body2" component="h6" className={classes.version}>
                    Version {version}
                  </Text>
                </Tooltip>
              </li>,
            ]}
          >
            {currentLink?.nestedLinks?.map((navItem, idx) => {
              const shouldShow = navItem.requiredFeatures
                ? navItem.requiredFeatures(features)
                : true
              if (!shouldShow) {
                return null
              }
              return (
                <NavItem
                  {...navItem}
                  key={idx}
                  className={classes.textOnlyNavItem}
                  isActive={matchesCurrentPath(currentPath, navItem?.link)}
                  activeDisplayType="bar"
                  open
                  compact
                />
              )
            })}
          </NavPane>
        )}
      </aside>
    </>
  )
}

interface StyleProps {
  drawerOpen: boolean
  singlePane: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  hiddenPane: {
    transform: ({ drawerOpen }) => `translate(-${drawerOpen ? '289' : '73'}px, 0px)`,
  },
  openPane: {
    transform: ({ drawerOpen }) => `translate(0px, 0px)`,
  },
  customNavWidth: {
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '100%',
      bottom: 0,
      width: 128,
      backgroundColor: theme.components.sidebar.background,
    },

    '& ~section.content-main': {
      zIndex: 1000,
      padding: '80px 32px',
    },
  },
  customNav: {
    position: 'relative',
    width: ({ drawerOpen }) => (drawerOpen ? 288 : 72),
    zIndex: 100,
    height: '100vh',
    borderRight: `1px solid ${theme.components.sidebar.border}`,
    backgroundColor: theme.components.sidebar.background,
    display: 'grid',
    justifyContent: 'stretch',
    transition: 'width .2s ease',
  },
  nav: {
    gridTemplateRows: 'max-content 1fr',
    gridTemplateColumns: ({ singlePane }) => (singlePane ? '1fr' : '72px 1fr'),
    gridTemplateAreas: ({ singlePane }) =>
      `"nav-header nav-header" "nav-primary-pane ${
        singlePane ? 'nav-primary-pane' : 'nav-secondary-pane'
      }"`,
  },
  pluginSelector: {
    display: 'grid',
    gridTemplateColumns: '72px 1fr',
    alignItems: 'center',
    justifyItems: 'stretch',
    height: 64,
    borderBottom: `1px solid ${theme.components.sidebar.border}`,
    cursor: 'pointer',
    '&:hover, &.active': {
      background: theme.components.sidebar.border,
    },
    '& #logoDefault': {
      justifySelf: 'center',
    },
  },
  pluginTitle: {
    color: theme.components.sidebar.activeText,
    textTransform: 'capitalize',
    display: ({ drawerOpen }) => (drawerOpen ? 'unset' : 'none'),
  },
  pluginMenuItem: {
    textTransform: 'capitalize',
    background: theme.components.sidebar.background,
    color: theme.components.sidebar.activeText,
    '&:hover': {
      background: theme.components.sidebar.border,
    },

    '& i': {
      fontSize: 22,
      width: 24,
      height: 24,
      color: theme.components.sidebar.activeText,
    },
  },
  pluginMenuContainer: {
    gridArea: 'nav-header',

    '& .menu-popover': {
      padding: 8,
      backgroundColor: theme.components.sidebar.background,
      borderColor: theme.components.sidebar.border,
    },
  },
  toggleCaret: {
    backgroundColor: theme.palette.grey['000'],
    boxShadow: '0 4px 24px 0 rgba(37, 37, 63, 0.25)',
    position: 'absolute',
    right: 0,
    top: 72,
    width: 24,
    height: 24,
    borderRadius: 24,
    border: 'none',
    transform: 'translate(50%, 0)',
    color: theme.palette.grey[900],
    outline: '0 !important',
    zIndex: 10,
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    '&:hover': {
      color: theme.palette.grey[900],
      backgroundColor: theme.palette.grey[100],
    },
    '& i': {
      fontSize: 12,
      width: 'auto',
    },
  },
  primaryPane: {
    gridArea: 'nav-primary-pane',
    borderRight: ({ singlePane }) =>
      singlePane ? 'none' : `1px solid ${theme.components.sidebar.border}`,
    '& ul': {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
  },
  secondaryPane: {
    gridArea: 'nav-secondary-pane',
    paddingTop: 16,
    gap: 8,

    '& > h6': {
      marginLeft: 16,
    },
  },
  navText: {
    display: 'grid',
    width: '100%',
    gridAutoFlow: 'column',
    gridTemplateColumns: ({ singlePane }) => (singlePane ? '72px 1fr' : '1fr'),
  },
  textOnlyNavItem: {
    paddingLeft: 32,
  },
  version: {
    marginBottom: 14,
    color: theme.components.sidebar.text,
    textAlign: 'center',
  },
}))

export default Sidebar
