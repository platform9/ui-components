import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import NavItem, { NavItemProps } from '../../elements/sidebar/NavItem'
import NavPane from '../../elements/sidebar/NavPane'

const meta: Meta<NavItemProps> = {
  title: 'Elements/Sidebar/NavItem',
  component: NavItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
         <div style={{ width: 250, background: '#222', padding: 10 }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <Story />
            </ul>
         </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    name: { control: 'text' },
    link: { control: 'object' },
    icon: { control: 'text' },
    isActive: { control: 'boolean' },
    open: { control: 'boolean' },
    compact: { control: 'boolean' },
    disableLink: { control: 'boolean' },
    tooltip: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<NavItemProps>

const baseArgs: NavItemProps = {
  name: 'Dashboard',
  link: { path: '/dashboard', onClick: () => {} },
  icon: 'tachometer-alt',
  open: true,
  nestedLinks: null,
}

export const Default: Story = {
  args: baseArgs,
}

export const Active: Story = {
  args: {
    ...baseArgs,
    isActive: true,
  },
}

export const Collapsed: Story = {
  args: {
    ...baseArgs,
    open: false,
  },
  decorators: [
      (Story) => (
          <div style={{ width: 72 }}>
              <Story />
          </div>
      )
  ]
}

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disableLink: true,
  },
}

export const External: Story = {
  args: {
    ...baseArgs,
    name: 'External Link',
    link: { url: 'https://example.com', external: true, onClick: () => {}, path: '' },
    icon: 'external-link-alt',
  },
}
