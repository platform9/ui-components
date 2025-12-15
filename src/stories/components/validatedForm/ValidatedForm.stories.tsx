import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ValidatedForm from '../../../components/validatedForm/ValidatedForm'
import TextField from '../../../components/validatedForm/TextField'
import CheckboxField from '../../../components/validatedForm/CheckboxField'
import DropdownField from '../../../components/validatedForm/DropdownField'
import ToggleSwitchField from '../../../components/validatedForm/ToggleSwitchField'
import Button from '../../../elements/button'
import AsyncDropdown from '../../../elements/dropdown/AsyncDropdown'
import { MemoryRouter } from 'react-router-dom'

// Mocking AsyncDropdown for DropdownField
const MockDropdown = (props) => <AsyncDropdown {...props} />

type ValidatedFormProps = React.ComponentProps<typeof ValidatedForm>

const meta: Meta<ValidatedFormProps> = {
  title: 'Components/ValidatedForm/ValidatedForm',
  component: ValidatedForm,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    clearOnSubmit: { control: 'boolean' },
    debug: { control: 'boolean' },
    elevated: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<ValidatedFormProps>

const initialValues = {
  username: '',
  email: '',
  role: 'user',
  terms: false,
  notifications: true,
}

const Wrapper = (args: ValidatedFormProps) => {
    return (
        <ValidatedForm
            {...args}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2))
                return Promise.resolve(true)
            }}
            formActions={
                <Button type="submit" variant="primary">Submit</Button>
            }
        >
            <TextField id="username" label="Username" required />
            <TextField id="email" label="Email" type="email" required />
            <DropdownField
                id="role"
                label="Role"
                DropdownComponent={MockDropdown}
                items={[
                    { label: 'User', value: 'user' },
                    { label: 'Admin', value: 'admin' },
                ]}
            />
            <ToggleSwitchField id="notifications" label="Enable Notifications" />
            <CheckboxField id="terms" label="I agree to the terms" required />
        </ValidatedForm>
    )
}

export const Default: Story = {
  args: {
    initialValues: initialValues,
    title: 'User Registration',
  },
  render: (args) => <Wrapper {...args} />
}

export const Elevated: Story = {
  args: {
    initialValues: initialValues,
    title: 'Elevated Form',
    elevated: true,
  },
  render: (args) => <Wrapper {...args} />
}

export const NotElevated: Story = {
  args: {
    initialValues: initialValues,
    title: 'Flat Form',
    elevated: false,
  },
  render: (args) => <Wrapper {...args} />
}
