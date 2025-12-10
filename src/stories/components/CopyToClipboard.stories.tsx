import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CopyToClipboard from '../../components/CopyToClipboard'

type CopyToClipboardProps = React.ComponentProps<typeof CopyToClipboard>

const meta: Meta<CopyToClipboardProps> = {
  title: 'Components/CopyToClipboard',
  component: CopyToClipboard,
  argTypes: {
    copyText: {
      control: { type: 'text' },
      description: 'Text to copy',
    },
    header: {
      control: { type: 'text' },
      description: 'Header text (only visible if header is provided)',
    },
    inline: {
      control: { type: 'boolean' },
      description: 'Inline display mode',
    },
    codeBlock: {
      control: { type: 'boolean' },
      description: 'Code block styling',
    },
    fill: {
      control: { type: 'boolean' },
      description: 'Fill container width',
    },
  },
}

export default meta

type Story = StoryObj<CopyToClipboardProps>

const baseArgs: CopyToClipboardProps = {
  copyText: 'This text will be copied to clipboard',
  children: <span>Some content to display</span>,
}

export const Default: Story = {
  args: baseArgs,
}

export const InlineCode: Story = {
  args: {
    ...baseArgs,
    children: <code>npm install package-name</code>,
    copyText: 'npm install package-name',
    inline: true,
    codeBlock: true,
  },
}

export const BlockWithHeader: Story = {
  args: {
    ...baseArgs,
    header: 'Installation',
    children: <pre style={{ margin: 0, padding: 10 }}>npm install my-awesome-package</pre>,
    copyText: 'npm install my-awesome-package',
    inline: false,
    codeBlock: true,
  },
}

export const PlainText: Story = {
  args: {
    ...baseArgs,
    children: <span>Simple text copy</span>,
    copyText: 'Simple text copy',
    codeBlock: false,
  },
}
