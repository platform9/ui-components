import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CodeMirror from '../../../components/codeMirror/CodeMirror'

type CodeMirrorProps = React.ComponentProps<typeof CodeMirror>

const meta: Meta<CodeMirrorProps> = {
  title: 'Components/CodeMirror/CodeMirror',
  component: CodeMirror,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    hasError: { control: 'boolean' },
    errorMessage: { control: 'text' },
    loading: { control: 'boolean' },
    showSearchBar: { control: 'boolean' },
    showCopyButton: { control: 'boolean' },
    showDownloadButton: { control: 'boolean' },
    showExpandButton: { control: 'boolean' },
    showCollapseButton: { control: 'boolean' },
    collapseYaml: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
}

export default meta

type Story = StoryObj<CodeMirrorProps>

const yamlContent = `apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
`

const baseArgs: CodeMirrorProps = {
  id: 'cm-demo',
  label: 'YAML Configuration',
  value: yamlContent,
  onChange: () => {},
  options: {
      mode: 'yaml',
  }
}

const Wrapper = (args: CodeMirrorProps) => {
    const [val, setVal] = useState(args.value)
    return (
        <CodeMirror 
            {...args}
            value={val}
            onChange={(v) => {
                setVal(v)
                args.onChange?.(v)
            }}
        />
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />
}

export const WithTools: Story = {
  args: {
    ...baseArgs,
    showSearchBar: true,
    showCopyButton: true,
    showDownloadButton: true,
    showExpandButton: true,
    showCollapseButton: true,
    downloadFileName: 'config.yaml',
  },
  render: (args) => <Wrapper {...args} />
}

export const WithError: Story = {
    args: {
        ...baseArgs,
        hasError: true,
        errorMessage: 'Invalid configuration syntax',
    },
    render: (args) => <Wrapper {...args} />
}
