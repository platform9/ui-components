import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import FilterToolbar from '../../../components/cardTable/FilterToolbar'
import { MemoryRouter } from 'react-router-dom'

type FilterToolbarProps = React.ComponentProps<typeof FilterToolbar>

const meta: Meta<FilterToolbarProps> = {
  title: 'Components/CardTable/FilterToolbar',
  component: FilterToolbar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    searchTerm: { control: 'text' },
    onSearchChange: { action: 'searchChanged' },
    onRefresh: { action: 'refreshed' },
    showSortOption: { control: 'boolean' },
    sortBy: { control: 'text' },
    onSortChange: { action: 'sortChanged' },
  },
}

export default meta

type Story = StoryObj<FilterToolbarProps>

const baseArgs: FilterToolbarProps = {
  searchTerm: '',
  onSearchChange: () => {},
  onRefresh: () => {},
  sortOptions: [
      { label: 'Name', value: 'name' },
      { label: 'Status', value: 'status' }
  ],
}

const Wrapper = (args: FilterToolbarProps) => {
    const [term, setTerm] = useState(args.searchTerm)
    const [sortBy, setSortBy] = useState(args.sortBy)

    return (
        <FilterToolbar 
            {...args}
            searchTerm={term}
            onSearchChange={(val) => {
                setTerm(val)
                args.onSearchChange?.(val)
            }}
            sortBy={sortBy}
            onSortChange={(val) => {
                setSortBy(val)
                args.onSortChange?.(val)
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
      showSortOption: true,
      sortBy: 'name',
  },
  render: (args) => <Wrapper {...args} />
}
