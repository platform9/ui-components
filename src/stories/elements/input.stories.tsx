import type { Meta, StoryObj } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import Input from '../../elements/input/Input'
import useToggler from '../../hooks/useToggler'

const meta: Meta<typeof Input> = {
  title: 'Elements/Input',
  component: Input,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    info: {
      control: 'text',
      description: 'Tooltip info text',
    },
    icon: {
      control: 'text',
      description: 'Name of the FontAwesome icon',
    },
    compact: {
      control: 'boolean',
      description: 'Reduces padding/size',
    },
    variant: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
      description: 'Visual variant',
    },
    onChange: { action: 'changed' },
    iconProps: {
      control: 'object',
      description: 'Props for the icon (onClick, placement)',
    },
  },
}

export default meta

type Story = StoryObj<typeof Input>

const baseArgs = {
  label: 'Label',
  placeholder: 'Placeholder label',
}

const StatefulInput = (args) => {
  const [value, setValue] = useState(args.value || '')

  useEffect(() => {
    setValue(args.value || '')
  }, [args.value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return <Input {...args} value={value} onChange={handleChange} />
}

const PasswordInputStory = (args) => {
  const [value, setValue] = useState('')
  const [isPasswordHidden, toggleIsPasswordHidden] = useToggler(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const iconProps = {
    onClick: toggleIsPasswordHidden,
    placement: 'end' as const,
  }

  return (
    <Input
      {...args}
      type={isPasswordHidden ? 'password' : 'text'}
      icon={isPasswordHidden ? 'eye' : 'eye-slash'}
      iconProps={iconProps}
      value={value}
      onChange={handleChange}
    />
  )
}

export const Default: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => <StatefulInput {...args} />,
}

export const WithIcon: Story = {
  args: {
    ...baseArgs,
    label: 'Search',
    placeholder: 'Search...',
    icon: 'search',
  },
  render: (args) => <StatefulInput {...args} />,
}

export const WithInfo: Story = {
  args: {
    ...baseArgs,
    label: 'With Info',
    placeholder: 'Hover the info icon',
    info: 'This is some helpful information',
  },
  render: (args) => <StatefulInput {...args} />,
}

export const ErrorState: Story = {
  args: {
    ...baseArgs,
    label: 'Error',
    placeholder: 'Invalid input',
    error: 'This field is required',
    value: '',
  },
  render: (args) => <StatefulInput {...args} />,
}

export const Disabled: Story = {
  args: {
    ...baseArgs,
    label: 'Disabled',
    placeholder: 'Cannot type here',
    disabled: true,
    value: 'Disabled Value',
  },
  render: (args) => <StatefulInput {...args} />,
}

export const Password: Story = {
  args: {
    ...baseArgs,
    label: 'Password',
    placeholder: 'Enter password',
    info: 'Click the eye icon to toggle visibility',
  },
  render: (args) => <PasswordInputStory {...args} />,
}
