import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Card from '../../elements/card'
import Badge from '../../elements/badge'
import { Row, Column } from '../containers'

const VARIANT_ITEMS = [
  { label: 'Default', variant: 'default' },
  { label: 'Primary', variant: 'primary' },
  { label: 'Secondary', variant: 'secondary' },
  { label: 'Success', variant: 'success' },
  { label: 'Warning', variant: 'warning' },
  { label: 'Unknown', variant: 'unknown' },
  { label: 'Danger', variant: 'danger' },
  { label: 'Error', variant: 'error' },
]

const renderGallery = (baseArgs: any) => (
  <Card>
    <Row>
      <Column>
        <Badge {...baseArgs} variant="default" text="label=annotation" bold={false} />
      </Column>
      {/* <Column>
        <Badge {...baseArgs} text="I am free form with a long message" />
      </Column> */}
      <Column>
        <Badge {...baseArgs} variant="primary" text="Beta Tester" />
      </Column>
      <Column>
        <Badge {...baseArgs} variant="secondary" text="Early Access" />
      </Column>
      <Column>
        <Badge {...baseArgs} variant="success" text="Running" />
      </Column>
      <Column>
        <Badge {...baseArgs} variant="warning" text="Warning" />
      </Column>
      <Column>
        <Badge {...baseArgs} variant="unknown" text="Pending" />
      </Column>
      <Column>
        <Badge {...baseArgs} variant="danger" text="Danger" />
      </Column>
      <Column>
        <Badge {...baseArgs} variant="error" text="Error" />
      </Column>
    </Row>
  </Card>
)

const meta: Meta<typeof Badge> = {
  title: 'Elements/Badge',
  component: Badge,
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'Primary badge label text',
      table: {
        type: { summary: 'string' },
      },
    },
    additionalText: {
      control: { type: 'text' },
      description: 'Optional additional text segment appended to the badge',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'unknown',
        'danger',
        'error',
      ],
      control: { type: 'select' },
      description: 'Defines the badges primary color',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'select' },
      },
    },
    ellipsisAt: {
      control: { type: 'number' },
      description: 'Character count at which the label is truncated with an ellipsis',
      table: {
        defaultValue: { summary: 15 },
        type: { summary: 'number' },
      },
    },
    canDismissEllipsis: {
      control: { type: 'boolean' },
      description: 'Allows users to toggle between truncated and full text',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    bold: {
      control: { type: 'boolean' },
      description: 'Renders the text using the bold caption style when true',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    tooltipBody: {
      control: { type: 'text' },
      description: 'Tooltip content to display on hover. Defaults to the badge text.',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Badge>

const baseArgs = {
  text: 'label=annotation',
  variant: 'default' as const,
  bold: false,
  ellipsisAt: 15,
  canDismissEllipsis: false,
}

export const Default: Story = {
  args: {
    ...baseArgs,
  },
}

export const Primary: Story = {
  args: {
    ...baseArgs,
    variant: 'primary',
    text: 'Beta Tester',
  },
}

export const WithAdditionalText: Story = {
  args: {
    ...baseArgs,
    variant: 'primary',
    text: 'Version',
    additionalText: '1.2.3',
  },
}

export const TruncatedText: Story = {
  args: {
    ...baseArgs,
    text: 'This is a very long label that will be truncated with an ellipsis',
    ellipsisAt: 20,
    canDismissEllipsis: true,
  },
}

export const WithTooltip: Story = {
  args: {
    ...baseArgs,
    variant: 'success',
    text: 'Hover for details',
    tooltipBody: 'This badge includes a custom tooltip body.',
  },
}

export const Gallery: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => renderGallery(args),
  parameters: {
    docs: {
      source: {
        code: `
import Badge from 'core/elements/badge'

const BadgeGroup = () => (
  <>
    <Badge variant="success" text="Success" />
    <Badge variant="error" text="Error" />
    <Badge variant="default" text="label=annotation"/>
  </>
)
`,
      },
    },
  },
}
