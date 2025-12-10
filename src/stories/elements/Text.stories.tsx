import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Text, { TextProps } from '../../elements/Text'
import typography from '../../theme-manager/themes/base/typography'

const variants = Object.keys(typography) as (keyof typeof typography)[]

const meta: Meta<TextProps> = {
  title: 'Elements/Text',
  component: Text,
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
      description: 'Typography variant',
      table: {
        defaultValue: { summary: 'body1' },
        type: { summary: 'string' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Text content',
    },
    component: {
      description: 'DOM element to render',
      control: { type: 'text' },
    },
    noWrap: {
      control: { type: 'boolean' },
      description: 'If true, the text will not wrap',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    lineClamp: {
      control: { type: 'number' },
      description: 'Number of lines to show before truncating',
      table: {
        type: { summary: 'number' },
      },
    },
    maxWidth: {
      control: { type: 'number' },
      description: 'Maximum width of the text container',
      table: {
        type: { summary: 'number' },
      },
    },
  },
}

export default meta

type Story = StoryObj<TextProps>

const baseArgs: Partial<TextProps> = {
  children: 'The quick brown fox jumps over the lazy dog',
  variant: 'body1',
}

export const Default: Story = {
  args: baseArgs,
}

export const Gallery: Story = {
  args: baseArgs,
  render: (args) => (
    <div style={{ display: 'grid', gap: '16px' }}>
      {variants.map((variant) => (
        <div key={variant}>
          <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>{variant}</div>
          <Text {...(args as any)} variant={variant}>
            {variant}: {args.children}
          </Text>
          <hr style={{ margin: '8px 0', borderColor: '#eee' }} />
        </div>
      ))}
    </div>
  ),
}

export const Truncation: Story = {
  args: {
    ...baseArgs,
    children:
      'This is a very long text that should be truncated because it exceeds the maximum width or line clamp settings. '.repeat(
        10,
      ),
    maxWidth: 300,
    noWrap: true,
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div>
        <strong>noWrap + maxWidth (300px):</strong>
        <Text {...(args as any)} />
      </div>
      <div>
        <strong>lineClamp (2 lines) + maxWidth (300px):</strong>
        <Text {...(args as any)} noWrap={false} lineClamp={2} />
      </div>
    </div>
  ),
}
