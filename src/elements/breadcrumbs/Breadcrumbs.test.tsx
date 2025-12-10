import React from 'react'
import { render, screen } from '../../test-utils'
import Breadcrumbs from './Breadcrumbs'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

// Mock dependencies
jest.mock('../../hooks/usePluginRouter', () => ({
  __esModule: true,
  default: () => ({
    currentLink: { icon: 'home' },
  }),
}))

jest.mock('use-react-router', () => ({
  __esModule: true,
  default: () => ({
    match: { params: {} },
    location: { pathname: '/test' },
  }),
}))

jest.mock('../../plugins/route', () => ({
  Route: {
    getCurrentRoute: () => ({
      breadcrumbs: new Map([
        ['home', 'home-route'],
        ['section', 'section-route'],
      ]),
    }),
    findRouteById: (id) => ({
      path: () => '/' + id.replace('-route', ''),
    }),
  },
}))

describe('Breadcrumbs', () => {
  it('renders breadcrumbs correctly', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Breadcrumbs nameOverrides={{}} />
      </Router>
    )

    // Helper capitalizes names: 'home' -> 'Home', 'section' -> 'Section'
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Section')).toBeInTheDocument()
  })
})