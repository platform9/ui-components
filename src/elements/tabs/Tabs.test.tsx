import React from 'react'
import { render, screen } from '../../test-utils'
import Tabs from './Tabs'
import Tab from './Tab'
import Text from '../Text'

jest.mock('use-react-router', () => () => ({
  history: { push: () => {} },
  match: { params: {} },
}))

describe('Tabs', () => {
  it('renders active tab content', () => {
    render(
      <Tabs activeTab="tab-1" setActiveTab={() => {}}>
        <Tab value="tab-1" label="Tab 1">
          <Text>I am tab 1</Text>
        </Tab>
        <Tab value="tab-2" label="Tab 2">
          <Text>I am tab 2</Text>
        </Tab>
      </Tabs>,
    )

    expect(screen.getByText('I am tab 1')).toBeInTheDocument()
  })
})
