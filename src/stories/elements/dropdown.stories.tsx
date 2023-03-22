import React, { useState } from 'react'
import Dropdown from '../../elements/dropdown'
import data from '../data/movies-list'
import { ThemedContainer, Row, Column } from '../containers'
import MultiDropdown from '../../elements/dropdown/MultiDropdown'

const items = data.map((movie) => ({
  value: movie,
  key: movie.id,
  label: movie.title,
}))

export const DefaultDropdown = (args) => {
  return (
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
    </ThemedContainer>
  )
}

export const ControlledDropdown = (args) => {
  const [value, setValue] = useState(data[2])
  const [multiValue, setMultiValue] = useState([data[0], data[2], data[4]])
  return (
    <ThemedContainer>
      <Row>
        <Column>
          <Dropdown {...args} value={value} onChange={setValue} label="Default" items={items} />
        </Column>
      </Row>
      <Row>
        <Column>
          <MultiDropdown
            {...args}
            values={multiValue}
            onChange={setMultiValue}
            label="Multi item"
            items={items}
          />
        </Column>
      </Row>
    </ThemedContainer>
  )
}

export default {
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
        defaultValue: { summary: 'Default Dropdown' },
        type: { summary: 'string' },
      },
    },
    enableSearch: {
      description: 'Defines wether to allow searching items by text',
      defaultValue: false,
    },
    noCheckboxes: {
      description: 'Defines wether to show checkboxes on a multiselect dropdown',
      defaultValue: false,
    },
    disabled: {
      description: 'Defines if you can interact with the dropdown',
      defaultValue: false,
    },
    loading: {
      description: 'Shows a loading state while working',
      defaultValue: false,
    },
  },
}
