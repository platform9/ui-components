import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Card from '../../elements/card/Card'
import CardBody from '../../elements/card/CardBody'
import CardFooter from '../../elements/card/CardFooter'
import CardHeader from '../../elements/card/CardHeader'
import CardHeaderWithLink from '../../elements/card/CardHeaderWithLink'
import Button from '../../elements/button/Button'

type CardComponentProps = React.ComponentProps<typeof Card>

const meta: Meta<CardComponentProps> = {
  title: 'Elements/Card',
  component: Card,
  subcomponents: { CardBody, CardFooter, CardHeader, CardHeaderWithLink } as any,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Card title (string or ReactNode)',
    },
    footer: {
      control: { type: 'text' },
      description: 'Card footer content',
    },
    withCustomBody: {
      control: { type: 'boolean' },
      description: 'If true, renders children without wrapping in CardBody',
      table: { defaultValue: { summary: false } },
    },
    withCustomFooter: {
      control: { type: 'boolean' },
      description: 'If true, renders footer without wrapping in CardFooter',
      table: { defaultValue: { summary: false } },
    },
  },
}

export default meta

type Story = StoryObj<CardComponentProps>

const baseArgs: CardComponentProps = {
  title: 'Card Title',
  children: 'Card content goes here. This is wrapped in CardBody by default.',
}

export const Default: Story = {
  args: baseArgs,
}

export const WithFooter: Story = {
  args: {
    ...baseArgs,
    footer: 'Card Footer Content',
  },
}

export const WithCustomHeader: Story = {
  args: {
    ...baseArgs,
    title: (
        <CardHeaderWithLink 
            linkComponent={<Button variant="secondary">Action</Button>}
        >
            Custom Header
        </CardHeaderWithLink>
    ),
  },
}

export const CustomBodyAndFooter: Story = {
  args: {
    title: 'Custom Body & Footer',
    withCustomBody: true,
    withCustomFooter: true,
    footer: <div style={{ padding: 10, background: '#eee' }}>Custom Footer Div</div>,
    children: <div style={{ padding: 10, background: '#f9f9f9' }}>Custom Body Content</div>,
  },
}

export const Gallery: Story = {
  args: baseArgs,
  render: (args) => (
    <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
      <div>
        <strong>Default:</strong>
        <Card {...args} />
      </div>
      <div>
        <strong>With Footer:</strong>
        <Card {...args} footer="Footer Content" />
      </div>
      <div>
        <strong>Custom Header with Link:</strong>
        <Card 
            title={
                <CardHeaderWithLink linkComponent={<Button size="small">Edit</Button>}>
                    User Profile
                </CardHeaderWithLink>
            }
        >
            <p>User details...</p>
        </Card>
      </div>
    </div>
  ),
}
