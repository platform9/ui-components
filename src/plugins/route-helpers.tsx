import { matchPath } from 'react-router'
import { memoize } from '../utils/misc'
import { IRouterLink } from './model'

export const matchLinkToPath = (url) =>
  memoize((link: IRouterLink) => {
    if (matchesCurrentPath(url, link.link)) {
      return true
    } else if (link?.nestedLinks?.some(({ link }) => matchesCurrentPath(url, link))) {
      return true
    }
    return false
  })

export const matchesCurrentPath = memoize(
  (url, link) =>
    link &&
    matchPath(url, {
      path: link.definition || link.path,
      exact: link.exact || false,
      strict: false,
    }),
)
