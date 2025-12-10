import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import Filter from '../../components/FilterSpec'

// Filter is the default export from FilterSpec.tsx

const meta: Meta<React.ComponentProps<typeof Filter>> = {
  title: 'Components/FilterSpec',
  component: Filter,
  decorators: [
      (Story) => (
          <MemoryRouter>
              <Story />
          </MemoryRouter>
      )
  ]
}

export default meta

type Story = StoryObj<React.ComponentProps<typeof Filter>>

const data = [
    { id: 1, name: 'Cluster A', region: 'US', status: 'Active' },
    { id: 2, name: 'Cluster B', region: 'EU', status: 'Inactive' },
    { id: 3, name: 'Cluster C', region: 'US', status: 'Active' },
    { id: 4, name: 'Cluster D', region: 'ASIA', status: 'Maintenance' },
]

const baseArgs = {
  data: data,
  setFilteredData: () => {},
  searchTarget: 'name',
  filters: [
      { name: 'region', label: 'Region', options: ['US', 'EU', 'ASIA'], target: 'region' },
      { name: 'status', label: 'Status', options: ['Active', 'Inactive', 'Maintenance'], target: 'status' }
  ]
}

const Wrapper = (args: any) => {
    const [filtered, setFiltered] = useState(args.data)
    
    return (
        <div>
            <Filter 
                {...args}
                setFilteredData={setFiltered}
            />
            <div style={{ marginTop: 20 }}>
                <strong>Filtered Results:</strong>
                <pre>{JSON.stringify(filtered, null, 2)}</pre>
            </div>
        </div>
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />
}
