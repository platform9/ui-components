import React from 'react'
import { Meta } from '@storybook/react'

import MultiToggleSwitch from '../../elements/MultiToggleSwitch'
import Card from '../../elements/card'
import { Column } from '../containers'

export const DefaultMultiToggleSwitch = (args) => {
  return (
    <Card>
      <Column>
        <MultiToggleSwitch
          {...args}
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Hourly', value: 'hourly' },
          ]}
        />
      </Column>
    </Card>
  )
}
DefaultMultiToggleSwitch.parameters = {
  docs: {
    source: {
      code: `
import MultiToggleSwitch from 'core/elements/MultiToggleSwitch'

const MyComponent = () => {
  return (
    <ToggleSwitch
        options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Hourly', value: 'hourly' },
        ]}
    />
  )
}
`,
    },
  },
}
DefaultMultiToggleSwitch.args = {
  options: [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Hourly', value: 'hourly' },
  ],
}

const ToggleSwitchStories: Meta = {
  title: 'Elements/MultiToggleSwitch',
  component: MultiToggleSwitch,
}
export default ToggleSwitchStories
