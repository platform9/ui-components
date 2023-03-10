import React from 'react'
import { Meta } from '@storybook/react'

import Card from 'src/elements/card'
import Badge from 'src/elements/badge'
import { Row, Column } from '../containers'

export const DefaultBadge = (args) => (
  <Card>
    <Row>
      <Column>
        <Badge variant="default" text="label=annotation" bold={false} />
      </Column>
      {/* <Column>
        <Badge {...args} text="I am free form with a long message" />
      </Column> */}
      <Column>
        <Badge variant="primary" text="Beta Tester" />
      </Column>
      <Column>
        <Badge variant="secondary" text="Early Access" />
      </Column>
      <Column>
        <Badge variant="success" text="Running" />
      </Column>
      <Column>
        <Badge variant="warning" text="Warning" />
      </Column>
      <Column>
        <Badge variant="unknown" text="Pending" />
      </Column>
      <Column>
        <Badge variant="danger" text="Danger" />
      </Column>
      <Column>
        <Badge variant="error" text="Error" />
      </Column>
    </Row>
  </Card>
)
DefaultBadge.parameters = {
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
}
DefaultBadge.args = {
  variant: 'default',
}

const BadgeStories: Meta = {
  title: 'Elements/Badge',
  component: Badge,
  argTypes: {
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
  },
}
export default BadgeStories
