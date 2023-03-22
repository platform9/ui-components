import React from 'react'
import { Meta } from '@storybook/react'

import Tabs from '../../elements/tabs'
import Tab from '../../elements/tabs/Tab'
import Text from '../../elements/Text'
// import { routes } from '../utils/routes'

export const TabsPreview = (args) => (
  // <Tabs route={routes.notifications.list}>
  <Tabs activeTab="tab-1">
    <Tab value="tab-1" label="Tab 1">
      <Text>I am tab 1</Text>
    </Tab>
    <Tab value="tab-2" label="Tab 2">
      <Text>I am tab 2</Text>
    </Tab>
    <Tab value="tab-3" label="Tab 3">
      <Text>I am tab 3</Text>
    </Tab>
  </Tabs>
)
TabsPreview.parameters = {
  docs: {
    source: {
      code: `
import Tabs from 'core/elements/tabs'
import Tab from 'core/elements/tabs/tab'

const MyComponent = () => (
  <Tabs>
    <Tab value="tab-1" label="Tab 1">
      <Text>I am tab 1</Text>
    </Tab>
    <Tab value="tab-2" label="Tab 2">
      <Text>I am tab 2</Text>
    </Tab>
    <Tab value="tab-3" label="Tab 3">
      <Text>I am tab 3</Text>
    </Tab>
  </Tabs>
)
`,
    },
  },
}
TabsPreview.args = {
  variant: 'light',
}

const TabStories: Meta = {
  title: 'Elements/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      options: ['light', 'dark'],
      control: { type: 'select' },
      description: 'Theme to render the button under',
      table: {
        defaultValue: { summary: 'light' },
        type: { summary: 'select' },
      },
    },
  },
}
export default TabStories
