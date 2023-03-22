import React, { useState } from 'react'
import { Meta } from '@storybook/react'

import Checkbox from '../../elements/input/Checkbox'
import Card from '../../elements/card'
import { Column } from '../containers'

export const DefaultCheckbox = (args) => {
  const [checked, setChecked] = useState(false)
  return (
    <Card>
      <Column>
        <Checkbox
          {...args}
          checked={checked || args.checked}
          label="Text Here"
          onChange={(checked) => setChecked(checked)}
        />
      </Column>
    </Card>
  )
}
DefaultCheckbox.parameters = {
  docs: {
    source: {
      code: `
import Checkbox from 'core/elements/input/checkbox'

const MyComponent = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Checkbox
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
DefaultCheckbox.args = {
  checked: false,
  disabled: false,
  indeterminate: false,
}

const CheckboxStories: Meta = {
  title: 'Elements/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Defines the checked state of the checkbox',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Defines the disabled state of the checkbox',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Defines if the checked state should be a dash instead',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
  },
}
export default CheckboxStories
