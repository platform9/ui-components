import React from 'react'
import { render, screen } from '../test-utils'
import usePluginRouter from './usePluginRouter'

jest.mock('use-react-router', () => {
  return () => ({
    location: { pathname: '/x', hash: '' },
  })
})

jest.mock('../plugins/pluginManager', () => {
  return {
    __esModule: true,
    default: {
      getPlugins: () => ({
        p1: {
          pluginId: 'p1',
          name: 'P1',
          icon: 'i',
          isDefault: true,
          data: { options: { foo: 'bar' } },
          getNavItems: () => [{ link: { path: '/x' } }],
        },
      }),
    },
  }
})

jest.mock('../plugins/helpers', () => {
  return {
    determineCurrentStack: () => 'p1',
    getSections: () => [
      {
        id: 'p1',
        isDefault: true,
        links: [{ link: { path: '/x' } }],
      },
    ],
  }
})

jest.mock('../plugins/route-helpers', () => {
  return {
    matchLinkToPath: () => () => true,
  }
})

const Harness: React.FC = () => {
  const result = usePluginRouter()
  return (
    <div>
      <div data-testid="plugin">{String(result.currentPluginId)}</div>
      <div data-testid="has-sections">{String(Array.isArray(result.sections))}</div>
    </div>
  )
}

describe('usePluginRouter', () => {
  it('returns current plugin id and sections', () => {
    render(<Harness />)

    expect(screen.getByTestId('plugin').textContent).toBe('p1')
    expect(screen.getByTestId('has-sections').textContent).toBe('true')
  })
})
