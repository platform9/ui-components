import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Checkbox from '../../elements/input/Checkbox'
import Card from '../../elements/card'
import { Column } from '../containers'

const meta: Meta<typeof Checkbox> = {
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
    label: {
      control: { type: 'text' },
      description: 'Label displayed next to the checkbox',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    info: {
      control: { type: 'text' },
      description: 'Optional tooltip content shown when hovering the checkbox',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    textWeight: {
      options: ['heavy', 'light'],
      control: { type: 'radio' },
      description: 'Typography weight used for the label text',
      table: {
        defaultValue: { summary: 'heavy' },
        type: { summary: '"heavy" | "light"' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

const baseArgs = {
  checked: false,
  disabled: false,
  indeterminate: false,
  label: 'Text Here',
}

const StatefulCheckbox = (args) => {
  const [checked, setChecked] = useState(false)
  return (
    <Card>
      <Column>
        <Checkbox
          {...args}
          checked={checked || args.checked}
          onChange={(nextChecked) => setChecked(nextChecked)}
        />
      </Column>
    </Card>
  )
}

export const Default: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => <StatefulCheckbox {...args} />,
  parameters: {
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
  },
}

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
  },
  render: (args) => <StatefulCheckbox {...args} />,
}

export const Indeterminate: Story = {
  args: {
    ...baseArgs,
    indeterminate: true,
  },
  render: (args) => <StatefulCheckbox {...args} />,
}

export const Gallery: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <Card>
      <Column>
        <Checkbox {...args} label="Default" checked={false} />
        <Checkbox {...args} label="Checked" checked={true} />
        <Checkbox {...args} label="Disabled" disabled checked={false} />
        <Checkbox {...args} label="Indeterminate" indeterminate checked={false} />
      </Column>
    </Card>
  ),
}
