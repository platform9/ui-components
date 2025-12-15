import { getCrumbs } from './helpers'

jest.mock('../../plugins/route', () => {
  return {
    Route: {
      findRouteById: jest.fn(),
    },
  }
})

// Import after the mock so the module under test gets the mocked Route
import { Route } from '../../plugins/route'

const findRouteByIdMock = Route.findRouteById as unknown as jest.Mock

describe('breadcrumbs/helpers', () => {
  beforeEach(() => {
    findRouteByIdMock.mockReset()
  })

  it('returns empty array when breadcrumbs is falsy', () => {
    expect(getCrumbs(undefined as any, {}, {})).toEqual([])
  })

  it('builds crumbs with names derived from params and pathParts', () => {
    findRouteByIdMock.mockImplementation((id: string) => {
      if (id === 'user') {
        return {
          path: () => '/users/123?foo=bar',
        }
      }
      return undefined
    })

    const breadcrumbs = new Map<string, string>([
      [':userId', 'user'],
      ['my-page-name', undefined as any],
    ])

    const crumbs = getCrumbs(breadcrumbs as any, { userId: '123' }, { userId: '123' })

    expect(crumbs).toEqual([
      { name: '123', path: '/users/123' },
      { name: 'My Page Name', path: null },
    ])
  })

  it('returns null path when routeId is missing or route is not found', () => {
    findRouteByIdMock.mockReturnValue(undefined)

    const breadcrumbs = new Map<string, string>([
      ['page', 'missing'],
      ['other', undefined as any],
    ])

    const crumbs = getCrumbs(breadcrumbs as any, {}, {})

    expect(crumbs).toEqual([
      { name: 'Page', path: null },
      { name: 'Other', path: null },
    ])
  })
})
