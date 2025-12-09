import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import ToggleSwitch from '../../elements/ToggleSwitch'
import Card from '../../elements/card'
import { Column } from '../containers'

const meta: Meta<typeof ToggleSwitch> = {
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
    label: {
      control: { type: 'text' },
      description: 'Label rendered next to the switch',
      table: {
        type: { summary: 'string' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ToggleSwitch>

const baseArgs = {
  active: false,
  disabled: false,
  label: 'Text Here',
}

const StatefulToggle = (args) => {
  const [active, setActive] = useState(false)
  return (
    <Card>
      <Column>
        <ToggleSwitch
          {...args}
          active={active || args.active}
          onClick={(nextActive) => setActive(nextActive)}
        />
      </Column>
    </Card>
  )
}

export const Default: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => <StatefulToggle {...args} />,
  parameters: {
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
  },
}

export const Active: Story = {
  args: {
    ...baseArgs,
    active: true,
  },
  render: (args) => <StatefulToggle {...args} />,
}

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
  },
  render: (args) => <StatefulToggle {...args} />,
}

export const Gallery: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <Card>
      <Column>
        <ToggleSwitch {...args} label="Default" active={false} onClick={() => {}} />
        <ToggleSwitch {...args} label="Active" active onClick={() => {}} />
        <ToggleSwitch
          {...args}
          label="Disabled"
          disabled
          active={false}
          onClick={() => {}}
        />
      </Column>
    </Card>
  ),
}
