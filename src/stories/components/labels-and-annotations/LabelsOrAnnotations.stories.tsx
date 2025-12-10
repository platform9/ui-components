import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Labels, Annotations } from '../../../components/labels-and-annotations/LabelsOrAnnotations'

// Creating a wrapper story for both components since they are similar
const meta: Meta = {
  title: 'Components/Labels and Annotations',
  component: Labels, // Defaulting to Labels for argTypes inference
  argTypes: {
    separator: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof Labels>

const labelsData = {
  'app.kubernetes.io/name': 'nginx',
  'app.kubernetes.io/version': '1.14.2',
  'environment': 'production',
}

const annotationsData = {
  'deployment.kubernetes.io/revision': '1',
  'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"v1",...}',
}

export const LabelsExample: Story = {
  render: (args) => <Labels {...args} labels={labelsData} />,
}

export const AnnotationsExample: Story = {
  render: (args) => <Annotations {...args} annotations={annotationsData} />,
}

export const Empty: Story = {
  render: (args) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
              <strong>Empty Labels:</strong>
              <Labels {...args} labels={{}} />
          </div>
          <div>
              <strong>Empty Annotations:</strong>
              <Annotations {...args} annotations={{}} />
          </div>
      </div>
  )
}
