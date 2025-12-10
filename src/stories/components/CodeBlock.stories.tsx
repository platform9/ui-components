import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CodeBlock from '../../components/CodeBlock'

type CodeBlockProps = React.ComponentProps<typeof CodeBlock>

const meta: Meta<CodeBlockProps> = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Code content to display',
    },
    fill: {
      control: { type: 'boolean' },
      description: 'If true, fills the available height/width and flexes',
    },
    overflow: {
      control: { type: 'boolean' },
      description: 'If true, uses `pre` whitespace, else `pre-wrap`',
    },
  },
}

export default meta

type Story = StoryObj<CodeBlockProps>

const baseArgs: CodeBlockProps = {
  children: `const greeting = "Hello World";
console.log(greeting);

function add(a, b) {
  return a + b;
}`,
  fill: false,
  overflow: false,
}

export const Default: Story = {
  args: baseArgs,
}

export const LongContent: Story = {
  args: {
    ...baseArgs,
    children: JSON.stringify(
      {
        id: '12345',
        name: 'Test Object',
        description: 'This is a very long JSON object to demonstrate scrolling behavior.',
        data: Array.from({ length: 20 }).map((_, i) => ({ index: i, value: Math.random() })),
      },
      null,
      2,
    ),
  },
}

export const Gallery: Story = {
  args: baseArgs,
  render: (args) => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div>
        <strong>Default Code Block:</strong>
        <CodeBlock {...args} />
      </div>
      <div style={{ height: '200px', display: 'flex', flexDirection: 'column', border: '1px solid #ccc', padding: 10 }}>
        <strong>Filled Code Block (inside 200px container):</strong>
        <CodeBlock {...args} fill={true} overflow={true}>
            {args.children}
            {'\n// Extra lines to force scroll...'}
            {'\n'.repeat(20)}
            {'// End of file'}
        </CodeBlock>
      </div>
    </div>
  ),
}
