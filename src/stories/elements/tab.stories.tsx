import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Tabs from '../../elements/tabs'
import Tab from '../../elements/tabs/Tab'
import Text from '../../elements/Text'
// import { routes } from '../utils/routes'

const meta: Meta<typeof Tabs> = {
  title: 'Elements/Tabs',
  component: Tabs,
  argTypes: {
    activeTab: {
      control: { type: 'text' },
      description: 'Currently active tab value when using controlled tabs',
      table: {
        type: { summary: 'string' },
      },
    },
    previewInHeader: {
      control: { type: 'boolean' },
      description: 'When true, renders tab previews in a header portal',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Tabs>

const StatefulTabs = (args) => {
  const [activeTab, setActiveTab] = useState('tab-1')

  return (
    // <Tabs route={routes.notifications.list}>
    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} {...args}>
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
}

export const TabsPreview: Story = {
  render: (args) => <StatefulTabs {...args} />,
  parameters: {
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
  },
}
