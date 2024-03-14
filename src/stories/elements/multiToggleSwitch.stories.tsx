import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import MultiToggleSwitch from '../../elements/MultiToggleSwitch'
import Card from '../../elements/card'
import { Column } from '../containers'

export const DefaultMultiToggleSwitch = (args) => {
  const [activeOption, setActiveOption] = useState('monthly')
  return (
    <Card>
      <Column>
        <MultiToggleSwitch
          {...args}
          value={args.value || activeOption}
          onClick={(value) => setActiveOption(value)}
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

  const [activeOption, setActiveOption] = useState('monthly')

  return (
    <MultiToggleSwitch
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Hourly', value: 'hourly' },
          ]}
          value={activeOption}
          onClick={(value) => setActiveOption(value)}
          activeOptionColor='#00abe8'
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
  activeOptionColor: '#00abe8',
}

const ToggleSwitchStories: Meta = {
  title: 'Elements/MultiToggleSwitch',
  component: MultiToggleSwitch,
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Defines the active value',
      table: {
        defaultValue: { summary: 'monthly' },
        type: { summary: 'text' },
      },
    },
  },
}

export default ToggleSwitchStories
