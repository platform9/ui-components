import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import SelectableCard from '../../components/SelectableCard'
import Text from '../../elements/Text'

type SelectableCardProps = React.ComponentProps<typeof SelectableCard>

const meta: Meta<SelectableCardProps> = {
  title: 'Components/SelectableCard',
  component: SelectableCard,
  argTypes: {
    active: {
      control: { type: 'boolean' },
      description: 'Active/selected state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    showCheckmarkIcon: {
      control: { type: 'boolean' },
      description: 'Show checkmark when active',
    },
    onClick: { action: 'clicked' },
  },
}

export default meta

type Story = StoryObj<SelectableCardProps>

const baseArgs: SelectableCardProps = {
  id: 'card-1',
  active: false,
  showCheckmarkIcon: true,
  onClick: () => {},
  children: <div style={{ padding: 20 }}><Text variant="body1">Selectable Card</Text></div>,
}

const Wrapper = (args: SelectableCardProps) => {
    const [active, setActive] = useState(args.active)
    return (
        <div style={{ maxWidth: 300 }}>
            <SelectableCard 
                {...args}
                active={active}
                onClick={() => {
                    setActive(!active)
                    args.onClick?.(args.id)
                }}
            />
        </div>
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />,
}

export const Active: Story = {
  args: {
    ...baseArgs,
    active: true,
  },
  render: (args) => <Wrapper {...args} />,
}

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    disabledMsg: 'This card is disabled',
  },
  render: (args) => <Wrapper {...args} />,
}

export const Gallery: Story = {
  args: baseArgs,
  render: (args) => (
      <div style={{ display: 'flex', gap: 20 }}>
          <SelectableCard {...args} id="1" active={false}>
              <div style={{ padding: 20 }}>Card 1</div>
          </SelectableCard>
          <SelectableCard {...args} id="2" active={true}>
              <div style={{ padding: 20 }}>Card 2 (Active)</div>
          </SelectableCard>
           <SelectableCard {...args} id="3" disabled disabledMsg="Disabled">
              <div style={{ padding: 20 }}>Card 3 (Disabled)</div>
          </SelectableCard>
      </div>
  )
}
