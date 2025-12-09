import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Radio from '../../elements/input/Radio'
import Card from '../../elements/card'
import { Column } from '../containers'

const meta: Meta<typeof Radio> = {
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
    label: {
      control: { type: 'text' },
      description: 'Label displayed next to the radio button',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    info: {
      control: { type: 'text' },
      description: 'Optional tooltip content shown when hovering the radio',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Radio>

const baseArgs = {
  checked: false,
  disabled: false,
  label: 'Text Here',
}

const StatefulRadio = (args) => {
  const [checked, setChecked] = useState(false)
  return (
    <Card>
      <Column>
        <Radio
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
  render: (args) => <StatefulRadio {...args} />,
  parameters: {
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
  },
}

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
  },
  render: (args) => <StatefulRadio {...args} />,
}

export const Gallery: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <Card>
      <Column>
        <Radio {...args} label="Default" checked={false} />
        <Radio {...args} label="Checked" checked={true} />
        <Radio {...args} label="Disabled" disabled checked={false} />
      </Column>
    </Card>
  ),
}
