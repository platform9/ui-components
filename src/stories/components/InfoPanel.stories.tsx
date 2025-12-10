import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import InfoPanel from '../../components/InfoPanel'
import Text from '../../elements/Text'

type InfoPanelProps = React.ComponentProps<typeof InfoPanel>

const meta: Meta<InfoPanelProps> = {
  title: 'Components/InfoPanel',
  component: InfoPanel,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Panel title',
    },
    items: {
      control: { type: 'object' },
      description: 'Items to display (array of props or object)',
    },
  },
}

export default meta

type Story = StoryObj<InfoPanelProps>

const baseArgs: InfoPanelProps = {
  title: 'Info Panel',
  items: {
    'Name': { value: 'Cluster-1' },
    'Status': { value: 'Active', helpMessage: 'The cluster is running normally.' },
    'Region': { value: 'US-West' },
    'Version': { value: '1.21.5' },
  },
}

export const Default: Story = {
  args: baseArgs,
}

export const CustomBody: Story = {
  args: {
    title: 'Custom Body Panel',
    customBody: (
        <div style={{ padding: 16 }}>
            <Text variant="body1">This is a custom body content.</Text>
            <Text variant="body2">It replaces the default table view.</Text>
        </div>
    )
  },
}

export const ArrayItems: Story = {
    args: {
        title: 'Array Items',
        items: [
            { 'Field A': { value: 'Value A' } },
            { 'Field B': { value: 'Value B', helpMessage: 'Help for B' } }
        ]
    }
}
