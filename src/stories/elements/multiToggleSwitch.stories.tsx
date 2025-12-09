import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import MultiToggleSwitch from '../../elements/MultiToggleSwitch'
import Card from '../../elements/card'
import { Column } from '../containers'

const meta: Meta<typeof MultiToggleSwitch> = {
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
    options: {
      control: { type: 'object' },
      description: 'Available options to toggle between',
      table: {
        type: { summary: 'Array<{ label: string; value: unknown }>' },
      },
    },
    activeOptionColor: {
      control: { type: 'color' },
      description: 'Background color for the active option',
      table: {
        defaultValue: { summary: '#00abe8' },
        type: { summary: 'string' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof MultiToggleSwitch>

const baseArgs = {
  options: [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Hourly', value: 'hourly' },
  ],
  activeOptionColor: '#00abe8',
}

const StatefulMultiToggle = (args) => {
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

export const Default: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => <StatefulMultiToggle {...args} />,
  parameters: {
    docs: {
      source: {
        code: `
import MultiToggleSwitch from 'core/elements/MultiToggleSwitch'

const MyComponent = () => {

  const [activeOption, setActiveOption] = useState('monthly')

  return (
    <MultiToggleSwitch
          options=[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Hourly', value: 'hourly' },
          ]
          value={activeOption}
          onClick={(value) => setActiveOption(value)}
          activeOptionColor='#00abe8'
        />
  )
}
`,
      },
    },
  },
}

export const CustomColors: Story = {
  args: {
    ...baseArgs,
    activeOptionColor: '#ff6400',
  },
  render: (args) => <StatefulMultiToggle {...args} />,
}

export const Gallery: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <Card>
      <Column>
        <MultiToggleSwitch
          options={baseArgs.options}
          value="monthly"
          activeOptionColor={baseArgs.activeOptionColor}
          onClick={() => {}}
        />
        <MultiToggleSwitch
          options={[
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
          ]}
          value="day"
          activeOptionColor={baseArgs.activeOptionColor}
          onClick={() => {}}
        />
      </Column>
    </Card>
  ),
}
