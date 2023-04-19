import React from 'react'
import { apply, toPairs, Dictionary } from 'ramda'
import { Redirect, Route, Switch } from 'react-router'
import { ensureArray, isNilOrEmpty } from '../utils/fp'
import { memoize, pathJoin } from '../utils/misc'
import { Route as Router } from './route'

import Plugin from './plugin'
import { PluginSection } from './model'

export const parseNavItem = (basePath) => (navItem) => ({
  ...navItem,
  link: {
    ...navItem.link,
    path: navItem.link.external ? navItem.link.path : pathJoin(basePath, navItem.link.path),
    definition: navItem.link.definition ? pathJoin(basePath, navItem.link.definition) : null,
    defaultPath: navItem.link.defaultPath ? pathJoin(basePath, navItem.link.defaultPath) : null,
  },
  nestedLinks: navItem.nestedLinks ? navItem.nestedLinks.map(parseNavItem(basePath)) : null,
})

const defaultOptions = {
  showFooter: false,
  showNavMenu: true,
  showSidebar: false,
}

export const initData = (frame = null) => ({
  frame,
  components: [],
  routes: [],
  navItems: [],
  secondaryHeader: null,
  options: { ...defaultOptions },
})

export const determineCurrentStack = memoize((location, appPlugins, lastStack) => {
  const currentRoute = Router.getCurrentRoute()
  const handleReturn = () => {
    if (lastStack) {
      return lastStack
    }
    return 'default'
  }

  if (!currentRoute) return handleReturn()

  const match = currentRoute.pattern.match(location.pathname)
  if (!match) return handleReturn()

  if (appPlugins.includes(match.plugin)) {
    return match.plugin
  }
  return handleReturn()
})

// TODO
// const handlePluginChange = (newPluginId) => {
//   const pluginToShow = plugins[newPluginId]
//   const defaultRoute = pluginToShow.getDefaultRoute()
//   history.push(defaultRoute)
// }

export const renderPluginRoutes = (role) => (id, plugin) => {
  const defaultRoute = plugin.getDefaultRoute()
  const genericRoutes = [
    {
      link: { path: pathJoin(plugin.basePath, '') },
      // TODO: Implement 404 page
      render: () => <Redirect to={defaultRoute || '/ui/404'} />,
    },
  ]
  const filteredRoutes = plugin
    .getRoutes()
    .filter(
      ({ requiredRoles }) =>
        isNilOrEmpty(requiredRoles) || ensureArray(requiredRoles).includes(role),
    )
  const RouteComponent = plugin.routeComponent || Route
  return [...filteredRoutes, ...genericRoutes].map((route) => {
    const { component: Component, render, link } = route
    return (
      <RouteComponent
        key={link.path}
        path={link.path}
        exact={link.exact || false}
        render={render}
        component={Component}
      />
    )
  })
}

export const renderPlugins = memoize((plugins, role) =>
  toPairs(plugins)
    .map(apply(renderPluginRoutes(role)))
    .flat(),
)

export const renderPluginComponents = (id, plugin) => {
  const pluginComponents = plugin.getComponents()

  return (
    <Route key={plugin.basePath} path={plugin.basePath} exact={false}>
      {pluginComponents.map((PluginComponent, idx) => (
        <PluginComponent key={idx} />
      ))}
    </Route>
  )
}

export const renderRawComponents = memoize((plugins) =>
  toPairs(plugins).map(apply(renderPluginComponents)).flat(),
)

export const getSections = memoize(
  (plugins: Dictionary<Plugin>, role?: string, features?: Dictionary<unknown>): PluginSection[] =>
    toPairs(plugins).map(([id, plugin]) => ({
      id,
      name: plugin.name,
      icon: plugin.icon,
      isDefault: plugin.isDefault,
      links: plugin
        .getNavItems()
        .filter(
          ({ requiredRoles }) =>
            isNilOrEmpty(requiredRoles) || ensureArray(requiredRoles).includes(role),
        )
        .filter(
          ({ requiredFeatures }) => isNilOrEmpty(requiredFeatures) || requiredFeatures(features),
        ),
    })),
)

export const renderMainContent = memoize((plugins, role) => (
  <>
    {renderRawComponents(plugins)}
    <Switch>{renderPlugins(plugins, role)}</Switch>
  </>
))
