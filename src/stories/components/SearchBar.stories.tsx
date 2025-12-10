import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import SearchBar from '../../components/SearchBar'

type SearchBarProps = React.ComponentProps<typeof SearchBar>

const meta: Meta<SearchBarProps> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  argTypes: {
    searchTerm: {
      control: { type: 'text' },
      description: 'Current search term',
    },
    onSearchChange: { action: 'changed' },
  },
}

export default meta

type Story = StoryObj<SearchBarProps>

const baseArgs: SearchBarProps = {
  searchTerm: '',
  onSearchChange: () => {},
}

const Wrapper = (args: SearchBarProps) => {
    const [term, setTerm] = useState(args.searchTerm)
    return (
        <SearchBar 
            {...args}
            searchTerm={term}
            onSearchChange={(t) => {
                setTerm(t)
                args.onSearchChange?.(t)
            }}
        />
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />,
}

export const PreFilled: Story = {
  args: {
    ...baseArgs,
    searchTerm: 'initial search',
  },
  render: (args) => <Wrapper {...args} />,
}
