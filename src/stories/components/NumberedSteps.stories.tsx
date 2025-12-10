import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import NumberedSteps from '../../components/numbered-steps'
import Button from '../../elements/button/Button'

type NumberedStepsProps = React.ComponentProps<typeof NumberedSteps>

const meta: Meta<NumberedStepsProps> = {
  title: 'Components/NumberedSteps',
  component: NumberedSteps,
  argTypes: {
    step: {
      control: { type: 'number' },
      description: 'Step number',
    },
    title: {
      control: { type: 'text' },
      description: 'Step title',
    },
    description: {
      control: { type: 'text' },
      description: 'Step description',
    },
  },
}

export default meta

type Story = StoryObj<NumberedStepsProps>

const baseArgs: NumberedStepsProps = {
  step: 1,
  title: 'Configuration',
  description: 'Configure your cluster settings.',
}

export const Default: Story = {
  args: baseArgs,
}

export const WithChildren: Story = {
  args: {
    ...baseArgs,
    description: 'Please review the terms and click Next.',
    children: (
        <div style={{ marginLeft: 20 }}>
            <Button size="small">Next Step</Button>
        </div>
    )
  },
}

export const JSXDescription: Story = {
    args: {
        ...baseArgs,
        description: <span>This description uses <strong>JSX</strong> for formatting.</span>
    }
}
