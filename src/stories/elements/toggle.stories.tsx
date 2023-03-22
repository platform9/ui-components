import React, { useState } from 'react'
import { Meta } from '@storybook/react'

import ToggleSwitch from '../../elements/ToggleSwitch'
import Card from '../../elements/card'
import { Column } from '../containers'

export const DefaultToggleSwitch = (args) => {
  const [active, setActive] = useState(false)
  return (
    <Card>
      <Column>
        <ToggleSwitch
          {...args}
          active={active || args.active}
          label="Text Here"
          onClick={(active) => setActive(active)}
        />
      </Column>
    </Card>
  )
}
DefaultToggleSwitch.parameters = {
  docs: {
    source: {
      code: `
import ToggleSwitch from 'core/elements/toggle'

const MyComponent = () => {
  const [active, setActive] = useState(false)
  return (
    <ToggleSwitch
      label="Text Here"
      active={active}
      onClick={(active) => setActive(active)}
    />
  )
}
`,
    },
  },
}
DefaultToggleSwitch.args = {
  active: false,
  disabled: false,
}

const ToggleSwitchStories: Meta = {
  title: 'Elements/ToggleSwitch',
  component: ToggleSwitch,
  argTypes: {
    active: {
      control: { type: 'boolean' },
      description: 'Defines the active state of the toggle switch',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Defines the disabled state of the toggle switch',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
  },
}
export default ToggleSwitchStories
