import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CardTableToolbar from '../../../components/cardTable/CardTableToolbar'
import { MemoryRouter } from 'react-router-dom'

type CardTableToolbarProps = React.ComponentProps<typeof CardTableToolbar>

const meta: Meta<CardTableToolbarProps> = {
  title: 'Components/CardTable/CardTableToolbar',
  component: CardTableToolbar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    searchTerm: { control: 'text' },
    onSearchChange: { action: 'searchChanged' },
    onRefresh: { action: 'refreshed' },
    orderDirection: {
        control: { type: 'select' },
        options: ['asc', 'desc'],
    },
    orderBy: { control: 'text' },
    onSortChange: { action: 'sortChanged' },
    onDirectionSwitch: { action: 'directionSwitched' },
  },
}

export default meta

type Story = StoryObj<CardTableToolbarProps>

const baseArgs: CardTableToolbarProps = {
  title: 'Toolbar Title',
  searchTerm: '',
  onSearchChange: () => {},
  onRefresh: () => {},
  filters: [],
  filterValues: {},
  onFilterUpdate: () => () => {},
  onSortChange: () => {},
  onDirectionSwitch: () => {},
  orderBy: '',
  orderDirection: 'asc',
}

const Wrapper = (args: CardTableToolbarProps) => {
    const [term, setTerm] = useState(args.searchTerm)
    const [orderBy, setOrderBy] = useState(args.orderBy)
    const [direction, setDirection] = useState(args.orderDirection || 'asc')

    return (
        <CardTableToolbar 
            {...args}
            searchTerm={term}
            onSearchChange={(val) => {
                setTerm(val)
                args.onSearchChange?.(val)
            }}
            orderBy={orderBy}
            onSortChange={(val) => {
                setOrderBy(val)
                args.onSortChange?.(val)
            }}
            orderDirection={direction}
            onDirectionSwitch={() => {
                const newDir = direction === 'asc' ? 'desc' : 'asc'
                setDirection(newDir)
                args.onDirectionSwitch?.()
            }}
        />
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />
}

export const WithSorting: Story = {
  args: {
      ...baseArgs,
      sorting: [
          { label: 'Name', field: 'name' },
          { label: 'Date', field: 'created_at' }
      ],
      orderBy: 'name',
      orderDirection: 'asc',
  },
  render: (args) => <Wrapper {...args} />
}
