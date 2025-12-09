import React from 'react'
import { Meta } from '@storybook/react'

import Button from '../../elements/button'
 
const STATES = [
  { label: 'Default', props: {} },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Loading', props: { loading: true } },
]

const PROP_VARIATIONS = [
  { label: 'Base', props: {} },
  { label: 'With left icon', props: { icon: 'plus' } },
  { label: 'With right icon', props: { rightIcon: 'angle-right' } },
  { label: 'With tooltip', props: { info: 'Tooltip text' } },
]

const renderStates = (baseArgs) =>
  PROP_VARIATIONS.map((variation) => (
    <div key={variation.label} style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 4, fontWeight: 600 }}>{variation.label}</div>
      {STATES.map((state) => (
        <div key={state.label} style={{ marginBottom: 4 }}>
          <span style={{ marginRight: 8 }}>{state.label}</span>
          <Button {...baseArgs} {...variation.props} {...state.props}>
            {baseArgs.children}
          </Button>
        </div>
      ))}
    </div>
  ))

export const Primary = (args) => {
  const baseArgs = { ...args, variant: 'primary' }
  return <>{renderStates(baseArgs)}</>
}
Primary.args = {
  size: 'large',
  variant: 'primary',
  children: 'Click Me',
}

export const Secondary = (args) => {
  const baseArgs = { ...args, variant: 'secondary' }
  return <>{renderStates(baseArgs)}</>
}
Secondary.args = {
  ...Primary.args,
  variant: 'secondary',
}

export const Tertiary = (args) => {
  const baseArgs = { ...args, variant: 'tertiary' }
  return <>{renderStates(baseArgs)}</>
}
Tertiary.args = {
  ...Primary.args,
  variant: 'tertiary',
}

export const CTA = (args) => {
  const baseArgs = { ...args, variant: 'cta' }
  return <>{renderStates(baseArgs)}</>
}
CTA.args = {
  ...Primary.args,
  variant: 'cta',
}

const ButtonStories: Meta = {
  title: 'Elements/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'cta'],
      control: { type: 'select' },
      description: 'Defines the buttons state',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'select' },
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
      description: 'Controls the height and font-size of the button',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: 'select' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Defines if you can interact with the button',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows a loading state while working',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Button label content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'FontAwesome icon shown on the left',
      table: {
        type: { summary: 'string' },
      },
    },
    rightIcon: {
      control: { type: 'text' },
      description: 'FontAwesome icon shown on the right',
      table: {
        type: { summary: 'string' },
      },
    },
    info: {
      control: { type: 'text' },
      description: 'Tooltip content displayed on hover',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    solidIcon: {
      control: { type: 'boolean' },
      description: 'Whether the icon uses the solid style',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    iconBrand: {
      control: { type: 'boolean' },
      description: 'Whether the icon uses the brand style',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the button',
      table: {
        type: { summary: '(event) => void' },
      },
    },
  },
}
export default ButtonStories
