import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Accordion from '../../../components/accordion/Accordion'
import Text from '../../../elements/Text'

type AccordionProps = React.ComponentProps<typeof Accordion>

const meta: Meta<AccordionProps> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Accordion title',
    },
    icon: {
      control: { type: 'text' },
      description: 'Custom icon name',
    },
    open: {
      control: { type: 'boolean' },
      description: 'Controlled open state',
    },
    onClick: { action: 'clicked' },
  },
}

export default meta

type Story = StoryObj<AccordionProps>

const baseArgs: AccordionProps = {
  id: 'accordion-1',
  title: 'Accordion Title',
  children: (
    <div style={{ padding: '16px' }}>
      <Text variant="body1">This is the content of the accordion.</Text>
      <Text variant="body2">It can contain any arbitrary JSX.</Text>
    </div>
  ),
}

const Wrapper = (args: AccordionProps) => {
    // Uncontrolled wrapper mostly, unless args.open is provided explicitly in a controlled way
    return (
        <Accordion {...args} />
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />,
}

const ControlledWrapper = (args: AccordionProps) => {
    const [open, setOpen] = useState(true)
    return (
        <Accordion 
            {...args} 
            open={open} 
            onClick={() => setOpen(!open)}
            title={`Controlled Accordion (${open ? 'Open' : 'Closed'})`}
        />
    )
}

export const Controlled: Story = {
  args: {
    ...baseArgs,
    open: true,
  },
  render: (args) => <ControlledWrapper {...args} />
}

export const CustomTitle: Story = {
  args: {
    ...baseArgs,
    title: <Text variant="subtitle1" style={{ color: 'blue' }}>Custom <em>Styled</em> Title</Text>
  },
  render: (args) => <Wrapper {...args} />,
}

export const CustomIcon: Story = {
  args: {
    ...baseArgs,
    icon: 'arrow-circle-down',
  },
  render: (args) => <Wrapper {...args} />,
}
