import React from 'react'
import { initData, parseNavItem } from './helpers'
import DefaultFrame from '../containers/DefaultFrame'
import { createUrlWithQueryString } from './route'

class Plugin {
  constructor(
    public pluginId: string,
    public name: string,
    public basePath?: string,
    public icon?: any,
    public isDefault = false,
    public data = initData(DefaultFrame),
    private prependBasePath = parseNavItem(basePath),
  ) {}
  public setAsDefault() {
    this.isDefault = true
  }
  public clearAll() {
    this.data = initData()
  }

  public registerFrame(component) {
    this.data.frame = component
  }

  public registerComponent(component) {
    this.data.components.push(component)
  }

  public registerRoutes(components = []) {
    this.data.routes = [...this.data.routes, ...components.map(this.prependBasePath)]
  }

  public registerNavItems(items = []) {
    this.data.navItems = [...this.data.navItems, ...items.map(this.prependBasePath)]
  }

  public registerSecondaryHeader(component) {
    this.data.secondaryHeader = component
  }

  public getFrame() {
    return this.data.frame
  }

  public getComponents() {
    return this.data.components
  }

  public getRoutes() {
    return this.data.routes
  }

  public getNavItems() {
    return this.data.navItems
  }

  public getSecondaryHeader() {
    return this.data.secondaryHeader
  }

  public getOptions() {
    return this.data.options
  }

  public getOption(key) {
    return this.data.options[key]
  }

  public setOption(key, value) {
    this.data.options[key] = value
  }

  public getDefaultRoute(): string {
    // TODO once these routes are actual Route instances, we can just return defaultRoute.path()
    const defaultRoute = this.data.routes.find((r) => r?.link?.default)
    if (!defaultRoute) {
      return ''
    }
    const { defaultParams = {}, path } = defaultRoute.link
    return createUrlWithQueryString(path, defaultParams)
  }

  public render() {
    return null
  }
}

export default Plugin
