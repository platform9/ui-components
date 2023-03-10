import React, { useState } from 'react'
import { Meta } from '@storybook/react'

import Input from 'src/elements/input/Input'
import { Container, Column, Row } from '../containers'
import useToggler from 'src/hooks/useToggler'

export const DefaultInput = (args) => {
  const [value, setValue] = useState('')
  const updateValue = (event) => {
    const value = event.target.value
    setValue(value)
  }
  return (
    <Container>
      <Row>
        <Column padding="20px 0px" variant="card">
          <Input
            {...args}
            label="Label"
            placeholder="Placeholder label"
            icon="search"
            info="This is the help message"
            value={value}
            onChange={updateValue}
          />
        </Column>
        <Column padding="20px 0px" variant="frame">
          <Input
            {...args}
            label="Label"
            placeholder="Placeholder label"
            icon="search"
            info="This is the help message"
            value=""
          />
        </Column>
      </Row>
      <Row>
        <Column variant="card">
          <Input
            {...args}
            label="Error"
            placeholder="Placeholder label"
            icon="search"
            info="This is the help message"
            error="Field is required."
            value=""
          />
        </Column>
        <Column variant="frame">
          <Input
            {...args}
            label="Error"
            placeholder="Placeholder label"
            icon="search"
            info="This is the help message"
            error="Invalid value"
            value="Oops this is a bad value"
          />
        </Column>
      </Row>
      <Row>
        <Column padding="20px 0px 40px 0px" variant="card">
          <Input
            {...args}
            label="Disabled"
            placeholder="Placeholder label"
            icon="search"
            info="This is the help message"
            disabled
            value=""
          />
        </Column>
        <Column padding="20px 0px 40px 0px" variant="frame">
          <Input
            {...args}
            label="Disabled"
            placeholder="Placeholder label"
            icon="search"
            info="This is the help message"
            disabled
            value="Disabled with a value"
          />
        </Column>
      </Row>
    </Container>
  )
}
DefaultInput.parameters = {
  docs: {
    source: {
      code: `
import Input from 'core/elements/input'

const MyComponent = () => {
  const [value, setValue] = useState(false)
  return (
    <Input
      label="Label"
      value={value}
      onChange={(val) => setValue(val)}
    />
  )
}
`,
    },
  },
}
DefaultInput.args = {
  disabled: false,
}

export const PasswordInput = (args) => {
  const [value, setValue] = useState('')
  const updateValue = (event) => {
    const value = event.target.value
    setValue(value)
  }
  const [isPasswordHidden, toggleIsPasswordHidden] = useToggler(true)
  const handleIconClick = () => {
    toggleIsPasswordHidden()
  }
  const iconProps = {
    onClick: handleIconClick,
    placement: 'end',
  }
  return (
    <Container>
      <Row>
        <Column padding="20px 0px 40px 0px" variant="card">
          <Input
            {...args}
            label="Password"
            placeholder="Your Password"
            type={isPasswordHidden ? 'password' : 'text'}
            icon={isPasswordHidden ? 'eye' : 'eye-slash'}
            iconProps={iconProps}
            info="Please enter your current password. If you've forgotten it, try forgot password."
            value={value}
            onChange={updateValue}
          />
        </Column>
        <Column padding="20px 0px 40px 0px" variant="frame">
          <Input
            {...args}
            label="Password"
            placeholder="Your Password"
            type={isPasswordHidden ? 'password' : 'text'}
            icon={isPasswordHidden ? 'eye' : 'eye-slash'}
            iconProps={iconProps}
            info="Please enter your current password. If you've forgotten it, try forgot password."
            value={value}
            onChange={updateValue}
          />
        </Column>
      </Row>
    </Container>
  )
}

PasswordInput.args = {
  disabled: false,
}

const InputStories: Meta = {
  title: 'Elements/Input',
  component: Input,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Defines the disabled state of the input',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
  },
}
export default InputStories
