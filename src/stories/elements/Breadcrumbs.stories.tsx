import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import Crumb from '../../elements/breadcrumbs/Crumb'

// Since Breadcrumbs container is tightly coupled to global Router state,
// we create stories for the Crumb component which is the visual building block.

const meta: Meta<typeof Crumb> = {
  title: 'Elements/Breadcrumbs/Crumb',
  component: Crumb,
  decorators: [
    (Story) => (
      <MemoryRouter>
         <ul style={{ listStyle: 'none', display: 'flex', gap: 8, padding: 0 }}>
            <Story />
         </ul>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Breadcrumb label',
    },
    path: {
      control: { type: 'text' },
      description: 'Navigation path',
    },
    active: {
      control: { type: 'boolean' },
      description: 'Is the current active crumb',
    },
    icon: {
      control: { type: 'text' },
      description: 'Separator icon (e.g. chevron-right)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
  },
}

export default meta

type Story = StoryObj<typeof Crumb>

const baseArgs = {
  name: 'Section',
  path: '/section',
  active: false,
  icon: 'chevron-right',
}

export const Default: Story = {
  args: baseArgs,
}

export const Active: Story = {
  args: {
    ...baseArgs,
    active: true,
    name: 'Current Page',
  },
}

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
  },
}

export const Gallery: Story = {
  args: baseArgs,
  render: (args) => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div>
        <strong>Breadcrumb Sequence:</strong>
        <ul style={{ listStyle: 'none', display: 'flex', gap: 8, padding: 0, alignItems: 'center' }}>
            <Crumb {...args} name="Home" path="/" active={false} icon="chevron-right" />
            <Crumb {...args} name="Section" path="/section" active={false} icon="chevron-right" />
            <Crumb {...args} name="Subsection" path="/section/sub" active={false} icon="chevron-right" />
            <Crumb {...args} name="Current Page" path="/section/sub/page" active={true} icon="chevron-right" />
        </ul>
      </div>
    </div>
  ),
}
