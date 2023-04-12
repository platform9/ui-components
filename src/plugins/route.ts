import URLPattern from 'url-pattern'
import { memoize } from '../utils/misc'

interface GenericKVP {
  [key: string]: string
}

interface IRouteOptions {
  id?: string
  url: string
  breadcrumbs?: Map<string, string>
  name: string
  defaultParams?: GenericKVP
  tab?: string
}

type OptionalGenericKVP = GenericKVP | null | void

// This will make a parameter optional if no type definition is passed
type OptionalParamType<T extends OptionalGenericKVP> = T extends null
  ? void | GenericKVP
  : T & GenericKVP
type RouterPathFn<T extends OptionalGenericKVP> = (
  params: OptionalParamType<T>,
  urlBase?: string,
) => string

export class Route<T extends OptionalGenericKVP = null> {
  id: string
  url: string
  breadcrumbs: Map<string, string>
  name: string
  defaultParams: GenericKVP
  pattern: URLPattern
  tab: string

  static routes: Route[] = []

  constructor(options: IRouteOptions) {
    this.id = options.id
    this.url = options.url
    this.name = options.name
    this.breadcrumbs = options.breadcrumbs || new Map()
    this.defaultParams = options.defaultParams || {}
    this.pattern = new URLPattern(options.url)
    this.tab = options.tab || ''
  }

  public path: RouterPathFn<T> = (params: OptionalParamType<T>) => {
    // @ts-ignore
    const allParams = { ...this.defaultParams, ...(params || {}) }
    return createUrlWithQueryString(new URL(this.url, window.location.origin), allParams)
  }

  public toString(prefix = ''): string {
    return this.path(null).replace(prefix, '')
  }

  /**
   * Register a route for this application
   * @param route route to register
   */
  static register<T extends OptionalGenericKVP = null>(routeOptions: IRouteOptions): Route<T> {
    const route = new Route<T>(routeOptions)
    Route.routes.push(route)
    return route
  }

  static getRoutes(): Route[] {
    return Route.routes
  }

  static getCurrentRoute<T extends OptionalGenericKVP = null>(pathname = ''): Route<T> | null {
    if (!pathname) {
      pathname = `${location.pathname}${location.hash}`
    }
    return Route.find(pathname)
  }

  static find = memoize(
    <T extends OptionalGenericKVP = null>(pathname: string): Route<T> | null => {
      return Route.getRoutes().find((r) => !!r.pattern.match(pathname))
    },
  )
  static findRouteById = memoize(
    <T extends OptionalGenericKVP = null>(id: string): Route<T> | undefined => {
      return Route.getRoutes().find((r) => r.id === id)
    },
  )
}

/*
    createUrlWithQueryString(routes.cluster.edit, {id: 'asdf', name: 'fdsa'})
    produces /ui/kubernetesd/clusters/edit/asdf?name=fdsa`,
  */
export function createUrlWithQueryString(url: URL | string, params?: GenericKVP) {
  if (!params || Object.keys(params || {}).length === 0) {
    if (typeof url === 'string') {
      return url
    }
    return url.toString().replace(url.origin, '')
  }
  if (typeof url === 'string') {
    url = new URL(url, window.location.origin)
  }

  const fields: GenericKVP = { ...params }

  // nice utility to reconstruct urls from objects / models
  // replace pathname variables (e.g. '/:id') with params when applicable
  if (url.pathname.includes(':')) {
    const matches = url.pathname.match(/:([0-9_a-z]+)/gi) || []
    matches.forEach((match) => {
      const key = match.replace(':', '')

      // dont replace if there isn't a substitution
      // @ts-ignore
      url.pathname = url.pathname.replace(match, fields[key] || match)
      delete fields[key]
    })
  }

  // replace a hash variable (e.g. '#:id') with params when applicable
  if (url.hash.includes(':')) {
    const [match = ''] = url.hash.match(/:([0-9_a-z]+)/gi) || []
    const key = match.replace(':', '')
    if (key) {
      url.hash = url.hash.replace(match, fields[key] || match)
      delete fields[key]
    }
  }

  // Tack on the remaining key values from our params to the URL's searchParams
  for (const [key, value] of Object.entries(fields)) {
    url.searchParams.append(key, value)
  }

  // URL requires an origin, but these routes need to omit the origin
  return `${url.toString().replace(url.origin, '')}`
}
