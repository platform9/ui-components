import React, { useState } from 'react'
import { Meta } from '@storybook/react'

import Radio from '../../elements/input/Radio'
import Card from '../../elements/card'
import { Column } from '../containers'

export const DefaultRadio = (args) => {
  const [checked, setChecked] = useState(false)
  return (
    <Card>
      <Column>
        <Radio
          {...args}
          checked={checked || args.checked}
          label="Text Here"
          onChange={(checked) => setChecked(checked)}
        />
      </Column>
    </Card>
  )
}
DefaultRadio.parameters = {
  docs: {
    source: {
      code: `
import Radio from 'core/elements/input/radio'

const MyComponent = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Radio
      label="Text Here"
      checked={checked}
      onChange={(checked) => setChecked(checked)}
    />
  )
}
`,
    },
  },
}
DefaultRadio.args = {
  checked: false,
  disabled: false,
}

const RadioStories: Meta = {
  title: 'Elements/Radio',
  component: Radio,
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Defines the checked state of the radio',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Defines the disabled state of the radio',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
  },
}
export default RadioStories
