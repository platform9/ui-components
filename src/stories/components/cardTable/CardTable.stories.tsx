import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CardTable from '../../../components/cardTable/CardTable'
import Card from '../../../elements/card'
import Text from '../../../elements/Text'
import { MemoryRouter } from 'react-router-dom'

type CardTableProps = React.ComponentProps<typeof CardTable>

const meta: Meta<CardTableProps> = {
  title: 'Components/CardTable/CardTable',
  component: CardTable,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    data: { control: 'object' },
    searchTarget: { control: 'text' },
    loading: { control: 'boolean' },
    loadingMessage: { control: 'text' },
    emptyItemsMessage: { control: 'text' },
    showSortOption: { control: 'boolean' },
    sortBy: {
      control: { type: 'select' },
      options: ['asc', 'desc'],
    },
    sortTarget: { control: 'text' },
    onSortChange: { action: 'sortChanged' },
    handleRefresh: { action: 'refreshed' },
  },
}

export default meta

type Story = StoryObj<CardTableProps>

const mockData = [
  { id: 1, name: 'Cluster Alpha', region: 'us-west-1', status: 'Active' },
  { id: 2, name: 'Cluster Beta', region: 'us-east-1', status: 'Provisioning' },
  { id: 3, name: 'Cluster Gamma', region: 'eu-central-1', status: 'Error' },
  { id: 4, name: 'Cluster Delta', region: 'us-west-2', status: 'Active' },
  { id: 5, name: 'Cluster Epsilon', region: 'ap-northeast-1', status: 'Active' },
]

const baseArgs: CardTableProps = {
  data: mockData,
  searchTarget: 'name',
  loading: false,
  handleRefresh: () => console.log('Refresh clicked'),
  children: (item) => (
      <div key={item.id} style={{ width: 368, height: 200 }}>
          <Card title={item.name}>
              <div style={{ padding: 16 }}>
                  <Text variant="body1">Region: {item.region}</Text>
                  <Text variant="body2">Status: {item.status}</Text>
              </div>
          </Card>
      </div>
  ),
  emptyItemsMessage: 'No items found',
}

const Wrapper = (args: CardTableProps) => {
    const [sortBy, setSortBy] = useState(args.sortBy)

    return (
        <CardTable 
            {...args}
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

export const Loading: Story = {
  args: {
    ...baseArgs,
    loading: true,
    loadingMessage: 'Loading clusters...',
  },
  render: (args) => <Wrapper {...args} />
}

export const Empty: Story = {
  args: {
    ...baseArgs,
    data: [],
  },
  render: (args) => <Wrapper {...args} />
}

export const WithSorting: Story = {
    args: {
        ...baseArgs,
        showSortOption: true,
        sortOptions: [
            { label: 'Name', value: 'name' },
            { label: 'Region', value: 'region' }
        ],
        sortTarget: 'name',
        sortBy: 'asc',
    },
    render: (args) => <Wrapper {...args} />
}
