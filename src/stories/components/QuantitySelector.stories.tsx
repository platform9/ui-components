import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import QuantitySelector from '../../components/QuantitySelector'

type QuantitySelectorProps = React.ComponentProps<typeof QuantitySelector>

const meta: Meta<QuantitySelectorProps> = {
  title: 'Components/QuantitySelector',
  component: QuantitySelector,
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Current value',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    onChange: { action: 'changed' },
    iconSize: {
        control: { type: 'select' },
        options: ['sm', 'lg']
    }
  },
}

export default meta

type Story = StoryObj<QuantitySelectorProps>

const baseArgs: QuantitySelectorProps = {
  value: 1,
  min: 0,
  max: 10,
  onChange: () => {},
}

const Wrapper = (args: QuantitySelectorProps) => {
    const [val, setVal] = useState(args.value || 0)
    return (
        <QuantitySelector 
            {...args}
            value={val}
            onChange={(v) => {
                setVal(v)
                args.onChange?.(v)
            }}
        />
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />,
}

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
  },
  render: (args) => <Wrapper {...args} />,
}

export const LargeIcons: Story = {
  args: {
    ...baseArgs,
    iconSize: 'lg',
  },
  render: (args) => <Wrapper {...args} />,
}
