import { Route as Router } from '../../plugins/route'
import { capitalizeString, memoize, memoizedObj } from '../../utils/misc'

const newCrumb = (name, path) => ({
  name,
  path,
})

const getCrumbName = (pathPart, params) => {
  if (pathPart.includes(':')) {
    const key = pathPart.replace(':', '')
    return params[key]
  } else {
    return pathPart.split('-').map(capitalizeString).join(' ')
  }
}

const getCrumbPath = (routeId, params) => {
  if (!routeId) {
    return null
  }
  const foundRoute = Router.findRouteById(routeId)
  if (!foundRoute) {
    return null
  }
  // remove any excess params that are converted to qs
  return foundRoute.path(params).split('?')[0]
}

export const getCrumbs = memoize(
  (breadcrumbs: Router['breadcrumbs'], breadCrumbParams, routeParams) => {
    if (!breadcrumbs) {
      return []
    }
    const crumbs = []
    for (const [pathPart, routeId] of breadcrumbs.entries()) {
      const name = getCrumbName(pathPart, breadCrumbParams)
      const path = getCrumbPath(routeId, routeParams)
      crumbs.push(newCrumb(name, path))
    }
    return crumbs
  },
)
