import { path } from 'ramda'
import moize, { Moizeable, Options } from 'moize'
import moment from 'moment'
import { moizeMaxSize } from '../constants'

export interface DefaultMoizeOptions {}

export const memoize = <F extends Moizeable, O extends Options = DefaultMoizeOptions>(
  fn: F,
  options: Partial<O> = {},
) =>
  moize(fn, {
    maxSize: moizeMaxSize,
    ...options,
  })

/**
 * Memoize using shallow equality to compare cache each key argument
 */
export const memoizeShallow = <F extends Moizeable, O extends Options>(
  fn: F,
  options: Partial<O> = {},
) =>
  moize(fn, {
    maxSize: moizeMaxSize,
    ...options,
    isShallowEqual: true,
  })

/**
 * Utility to globally memoize objects such as props or params
 */
export const generateObjMemoizer = <T>(): ((dep: T) => T) => memoizeShallow((dep) => dep)
export const memoizedObj = generateObjMemoizer()

const memoizePromiseOptions = {
  maxSize: moizeMaxSize,
  isShallowEqual: true, // Use ramda "equals" instead of moize SameValueZero comparisons
  isPromise: true,
  maxAge: 1000 * 60 * 5,
  updateExpire: true,
}
/**
 * Memoizes an async function to prevent the thundering herd problem.
 * This makes duplicate calls (comparing params using shallow equality) to return the same promise.
 */
export const memoizePromise = (asyncFn) => {
  const memoizedCb = moize(asyncFn, memoizePromiseOptions)
  return async (...params) => {
    try {
      const result = await memoizedCb(...params)
      // Clear the memoized cache when the promise is resolved (or rejected), so that all the subsequent calls will return a new promise
      memoizedCb.remove(params)
      return result
    } catch (err) {
      memoizedCb.remove(params)
      throw err
    }
  }
}

// Date formatter
export const defaultDateFormat = 'MMM Do YYYY, hh:mm A'
export const formatDate = (ts = '', format = defaultDateFormat) => moment(ts).format(format)

const getDurationItemByLabels = (labels) => {
  return [
    { startFnName: 'asMonths', fnName: 'months', label: 'mo' },
    { startFnName: 'asDays', fnName: 'days', label: 'd' },
    { startFnName: 'asHours', fnName: 'hours', label: 'h' },
    { startFnName: 'asMinutes', fnName: 'minutes', label: 'm' },
    { startFnName: 'asSeconds', fnName: 'seconds', label: 's' },
  ].filter((item) => labels.includes(item.label))
}
/**
 * DurationBetweenDates utility function that returns difference between give start and end date
 * into format 'n day(s) n hour(s) n minute(s) depending on respective values.
 * @example ('2020-01-28T00:44:35.000Z', '2020-01-29T01:45:36.000Z') -> '1 day, 1 hour, 1 minute'
 * @param {{labels?: string[], renameLabels?: {[key: string]: string}, pluralize?: boolean}} options
 * @returns {function(string): string}
 */
export const durationBetweenDates = ({
  labels = ['mo', 'd', 'h', 'm'],
  renameLabels = {
    mo: 'month',
    d: 'day',
    h: 'hour',
    m: 'minute',
  },
  pluralize = true,
}: {
  labels?: string[]
  renameLabels?: Record<string, string>
  pluralize?: boolean
}) =>
  memoize((startDateTime, endDateTime = new Date().valueOf()) => {
    const duration = moment.duration(moment(endDateTime).diff(moment(startDateTime)))
    const result = getDurationItemByLabels(labels).reduce((displayStr, curr) => {
      const value = Math.floor(duration[!displayStr ? curr.startFnName : curr.fnName]())
      if (value < 1) {
        return displayStr
      }

      if (displayStr) {
        displayStr += ', '
      }
      const pluralLabel = pluralize && value > 1 ? 's' : ''
      const label = renameLabels[curr.label] ? renameLabels[curr.label] : curr.label
      return `${displayStr}${value} ${label}${pluralLabel}`
    }, '')

    // if the format request doesn't include minutes, handle the case for new entities
    if (result === '') {
      const value = Math.ceil(duration.asMinutes())
      return `${value} minute${value !== 1 ? 's' : ''}`
    }
    return result
  })

/**
 * Given a number of seconds returns the number of
 * years, months, days, hours and minutes in a human readable format
 * @param seconds
 * @returns {string}
 */
export const secondsToString = (seconds) => {
  const min = 60
  const hour = min * 60
  const day = hour * 24
  const month = day * 30
  const year = day * 365
  const units = { year, month, day, hour, min }
  let remainingSeconds = seconds
  const results = Object.entries(units).reduce((acc, [unitName, unitSeconds]) => {
    const amount = Math.floor(remainingSeconds / unitSeconds)
    remainingSeconds %= units[unitName]
    if (amount >= 1) {
      return [...acc, `${amount} ${unitName}${amount >= 2 ? 's' : ''}`]
    }
    return acc
  }, [])
  return results.join(', ')
}

/**
 * Given a timestamp, returns the years, months, days, hours and minutes in a human readable format
 * @param creationTimeStamp
 * @returns {string}
 */
export const calculateAge = memoize((creationTimestamp) => {
  if (!creationTimestamp) return null
  return secondsToString(moment().diff(creationTimestamp, 's'))
})

// A more resilient JSON parsing that should always return {}
// in error conditions.
export const parseJSON = (str) => {
  if (typeof str !== 'string') {
    return {}
  }
  try {
    const data = JSON.parse(str)
    return data
  } catch (e) {
    console.error('Error parsing JSON', str)
    return {}
  }
}

export const isNumeric = (n) => !Number.isNaN(parseFloat(n)) && Number.isFinite(+n)

export const isPlainObject = (obj) =>
  Object(obj) === obj && Object.getPrototypeOf(obj) === Object.prototype

const duplicatedSlashesRegexp = new RegExp('(^\\/|[^:\\/]+\\/)\\/+', 'g')

// Given some path segments returns a properly formatted path similarly to Nodejs path.join()
// Remove duplicated slashes
// Does not remove leading/trailing slashes and adds a slash between segments
export const pathJoin = (...pathParts) =>
  []
    .concat(...pathParts) // Flatten
    .filter((segment) => !!segment) // Remove empty parts
    .join('/')
    .replace(duplicatedSlashesRegexp, '$1')

export const castFuzzyBool = (value) => {
  const mappings = {
    // JS performs a narrowing cast of ints, bools, and strings to the same key.
    false: false,
    true: true,
    0: false,
    1: true,
    False: false,
    True: true,
  }

  if (mappings[value] !== undefined) {
    return mappings[value]
  }
  return false
}

export const columnPathLookup = (_path) => (_, row) => path(_path.split('.'), row)

export const castBoolToStr =
  (t = 'Enabled', f = 'Not Enabled') =>
  (value) =>
    value ? t : f

export const tryJsonParse = moize((val) => (typeof val === 'string' ? JSON.parse(val) : val))

/**
 * Converts a camelCased string to a string with capitalized words separated by spaces
 * @example "camelCasedExampleString" -> "Camel Cased Example String"
 * @param inputStr
 * @returns {string}
 */
export const uncamelizeString = (inputStr = '') =>
  inputStr
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase())

/**
 * Converts a snake-case string to camelCase
 * @param inputStr
 */
export const snakeToCamelString = (inputStr) =>
  inputStr.replace(/-([A-Z])/gi, (str) => str.toUpperCase()).replace(/-/g, '')

/**
 * Converts a snake-case string to PascalCase
 * @param inputStr
 */
export const snakeToPascalString = (inputStr) =>
  inputStr
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/-([A-Z])/gi, (str) => str.toUpperCase())
    .replace(/-/g, '')

/**
 * Capitalize the first letter of the given string
 * @param inputStr
 * @returns {*}
 */
export const capitalizeString = (inputStr = '') =>
  inputStr
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase())

/**
 * Transform a string so that it only has alpha-numeric and hypens.  Useful for FQDN's.
 * @param {string} str
 * @returns {string}
 */
export const sanitizeUrl = (str = '') =>
  str
    .replace(/[^a-zA-Z0-9-_.]/g, '-') // replace non-valid url characters with hyphen
    .replace(/^-+/, '') // eliminate leading hyphens
    .replace(/\.+$/, '') // eliminate trailing dots

export const getCookieValue = (name) => {
  const val = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)')
  return val ? val.pop() : ''
}

export const normalizeUsername = (name = '') => {
  if (!name) return name

  // split emails from @ sign and take the left hand side
  const [username] = name.split('@')
  return username
}

// Really simple indefinite article function, does not account for special
// cases such as 'a user'
export const indefiniteArticle = (word = '') => (/^([aeiou])/i.test(word) ? 'an' : 'a')

export const cleanupStacktrace = (stacktrace = '') =>
  stacktrace
    .split('\n')
    .filter((res) => !!res.trim())
    .join('\n\n')

export const compareArrByValue =
  (key, order = 'asc') =>
  (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0
    }
    const comparison = a[key].localeCompare(b[key])

    return order === 'desc' ? comparison * -1 : comparison
  }

// Simple escape function to sanitize inputs before using in regexes
export const escapeRegex = (str) => {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export const add = (value, total) => (value ? parseFloat(value) + parseFloat(total || 0) : total)

// export const encodeStr = (str: string) => Buffer.from(str).toString('base64')
export const encodeStr = (str: string) => btoa(str)

// export const decodeStr = (str: string) => Buffer.from(str, 'base64').toString('ascii')
export const decodeStr = (str: string) => atob(str) // Buffer doesnt work

export const stripUnitFromValue = (value) => {
  const hasNumber = /\d/.test(value)
  if (!hasNumber) return value
  return parseFloat(value)
}

export const filterBySearch = (data, targets, searchTerm) => {
  const escapedTerm = escapeRegex(searchTerm)
  return data.filter((ele) =>
    targets.some((target) => ele[target]?.match(new RegExp(escapedTerm, 'i')) !== null),
  )
}

// ref:https://css-tricks.com/snippets/javascript/lighten-darken-color/
export function lightenDarkenColor(color: string, amt: number) {
  let usePound = false

  if (color && color[0] == '#') {
    color = color.slice(1)
    usePound = true
  }

  const num = parseInt(color, 16)

  let r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00ff) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000ff) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}
