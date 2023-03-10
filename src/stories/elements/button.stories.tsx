import React from 'react'
import { Meta } from '@storybook/react'

import Button from 'src/elements/button'
import Text from 'src/elements/Text'
import Card from 'src/elements/card'
import { Row, Column } from '../containers'

export const DefaultButton = (args) => (
  <Card>
    <Row>
      <Column>
        <Text variant="caption1">Primary</Text>
        <Button {...args}>Click Me</Button>
      </Column>{' '}
      <Column>
        <Text variant="caption1">Secondary</Text>
        <Button {...args} variant="secondary">
          Click Me
        </Button>
      </Column>
      <Column>
        <Text variant="caption1">Tertiary</Text>
        <Button {...args} variant="tertiary">
          Click Me
        </Button>
      </Column>
      <Column>
        <Text variant="caption1">CTA</Text>
        <Button {...args} variant="cta">
          Click Me
        </Button>
      </Column>
    </Row>
    <Row>
      <Column>
        <Text variant="caption1">Primary Disabled</Text>
        <Button {...args} disabled>
          Click Me
        </Button>
      </Column>{' '}
      <Column>
        <Text variant="caption1">Secondary Disabled</Text>
        <Button {...args} disabled variant="secondary">
          Click Me
        </Button>
      </Column>
      <Column>
        <Text variant="caption1">Tertiary Disabled</Text>
        <Button {...args} disabled variant="tertiary">
          Click Me
        </Button>
      </Column>
      <Column>
        <Text variant="caption1">CTA Disabled</Text>
        <Button {...args} disabled variant="cta">
          Click Me
        </Button>
      </Column>
    </Row>
    <Row>
      <Column>
        <Text variant="caption1">Primary Loading</Text>
        <Button {...args} loading>
          Click Me
        </Button>
      </Column>{' '}
      <Column>
        <Text variant="caption1">Secondary Loading</Text>
        <Button {...args} loading variant="secondary">
          Click Me
        </Button>
      </Column>
      <Column>
        <Text variant="caption1">Tertiary Loading</Text>
        <Button {...args} loading variant="tertiary">
          Click Me
        </Button>
      </Column>
      <Column>
        <Text variant="caption1">CTA Loading</Text>
        <Button {...args} loading variant="cta">
          Click Me
        </Button>
      </Column>
    </Row>
  </Card>
)
DefaultButton.parameters = {
  docs: {
    source: {
      code: `
import Button from 'core/elements/button'

const ButtonGroup = () => (
  <>
    <Button size="large">
      Click Me
    </Button>
    <Button size="large" variant="secondary">
      Click Me
    </Button>
    <Button size="large" variant="secondary">
      Click Me
    </Button>
  </>
)
`,
    },
  },
}
DefaultButton.args = {
  size: 'large',
  variant: 'primary',
}

const ButtonStories: Meta = {
  title: 'Elements/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'table'],
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
  },
}
export default ButtonStories
