import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import DropdownButtons from 'src/components/DropdownButtons'
import Dropdown from '../../elements/dropdown'
import MultiDropdown from '../../elements/dropdown/MultiDropdown'
import { Column, Row, ThemedContainer } from '../containers'
import data, { Movie } from '../data/movies-list'

const items = data.map((movie) => ({
  value: movie,
  key: movie.id,
  label: movie.title,
}))

const dropdownButtons = [
  { label: 'Edit', icon: 'edit' },
  { label: 'Delete', icon: 'trash', disabled: true },
  { label: 'Copy', icon: 'copy' },
]

const meta: Meta<typeof Dropdown> = {
  title: 'Elements/Dropdown',
  component: Dropdown,
  subcomponents: {
    MultiDropdown: MultiDropdown,
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Select a movie',
      table: {
        defaultValue: { summary: 'Select a movie' },
        type: { summary: 'string' },
      },
    },
    enableSearch: {
      control: { type: 'boolean' },
      description: 'Defines whether to allow searching items by text',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    noCheckboxes: {
      control: { type: 'boolean' },
      description: 'Defines whether to show checkboxes on a multiselect dropdown',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Defines if you can interact with the dropdown',
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

export default meta

type Story = StoryObj<typeof Dropdown>

const baseArgs = {
  placeholder: 'Select a movie',
  enableSearch: false,
  disabled: false,
  loading: false,
}

const ControlledDropdownStory = (args) => {
  const [value, setValue] = useState<Movie>(data[2])
  const [multiValue, setMultiValue] = useState<Movie[]>([data[0], data[2], data[4]])

  const handleMultiChange = (selectedValues: (Movie | '__all__' | '__none__')[]) => {
    const moviesOnly = selectedValues.filter(
      (selected): selected is Movie => typeof selected === 'object' && selected !== null,
    )
    setMultiValue(moviesOnly)
  }

  return (
    <ThemedContainer>
      <Row>
        <Column>
          <Dropdown
            {...args}
            value={value}
            onChange={setValue}
            label="Default"
            items={items}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <MultiDropdown
            {...args}
            value={multiValue}
            onChange={handleMultiChange}
            label="Multi item"
            items={items}
          />
        </Column>
      </Row>
    </ThemedContainer>
  )
}

export const Default: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <ThemedContainer>
      <Row>
        <Column>
          <Dropdown {...args} label="Default" items={items} />
        </Column>
      </Row>
      <Row>
        <Column>
          <MultiDropdown {...args} label="Multi item" items={items} />
        </Column>
      </Row>
      <Row>
        <Column>
          <DropdownButtons label="Dropdown Buttons" buttons={dropdownButtons} />
        </Column>
      </Row>
    </ThemedContainer>
  ),
}

export const Controlled: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => <ControlledDropdownStory {...args} />,
}

export const Searchable: Story = {
  args: {
    ...baseArgs,
    enableSearch: true,
  },
  render: (args) => (
    <ThemedContainer>
      <Row>
        <Column>
          <Dropdown {...args} label="Searchable" items={items} />
        </Column>
      </Row>
    </ThemedContainer>
  ),
}

export const Gallery: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <ThemedContainer>
      <Row>
        <Column>
          <Dropdown {...args} label="Default" items={items} />
        </Column>
        <Column>
          <Dropdown {...args} label="Disabled" disabled items={items} />
        </Column>
        <Column>
          <Dropdown {...args} label="With search" enableSearch items={items} />
        </Column>
      </Row>
    </ThemedContainer>
  ),
}
