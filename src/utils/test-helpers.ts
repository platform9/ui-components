import { memoize } from './misc'

const generateTestId = memoize((...params) =>
  params
    .join('-')
    .toLowerCase()
    .replace(/[^0-9a-z]/gi, '-')
    .replace(/(-+)/g, '-')
    .replace(/^(-+)/g, ''),
)
export default generateTestId
