import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Checkbox from '../../components/Checkbox'
import Text from '../../elements/Text'

// This Checkbox component is a wrapper around Material UI Checkbox with custom icons.
// It is distinct from elements/input/Checkbox.

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Checked state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Indeterminate state',
    },
    onChange: { action: 'changed' },
    name: {
        control: { type: 'text' },
        description: 'Input name',
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

const baseArgs = {
  checked: false,
  disabled: false,
  indeterminate: false,
  name: 'test-checkbox',
}

const Wrapper = (args: any) => {
    const [checked, setChecked] = useState(args.checked)
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox 
                {...args}
                checked={checked}
                onChange={(e) => {
                    setChecked(e.target.checked)
                    args.onChange?.(e)
                }}
            />
            <Text variant="body2" onClick={() => setChecked(!checked)} style={{ cursor: 'pointer' }}>
                Label for Checkbox
            </Text>
        </div>
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />,
}

export const Indeterminate: Story = {
  args: {
    ...baseArgs,
    indeterminate: true,
    checked: true,
  },
  render: (args) => <Wrapper {...args} />,
}

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    checked: true,
  },
  render: (args) => <Wrapper {...args} />,
}

export const Gallery: Story = {
  args: baseArgs,
  render: (args) => (
    <div style={{ display: 'grid', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox checked={false} /> <Text variant="body2">Unchecked</Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox checked={true} /> <Text variant="body2">Checked</Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox indeterminate /> <Text variant="body2">Indeterminate</Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox disabled checked={false} /> <Text variant="body2">Disabled Unchecked</Text>
      </div>
       <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox disabled checked={true} /> <Text variant="body2">Disabled Checked</Text>
      </div>
    </div>
  ),
}
