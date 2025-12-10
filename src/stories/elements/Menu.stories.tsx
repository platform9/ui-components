import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Menu, { IMenuProps } from '../../elements/menu/Menu'
import ListMenu from '../../elements/menu/ListMenu'
import MenuItem from '../../elements/menu/MenuItem'
import Button from '../../elements/button/Button'
import { bottomLeft, bottomMiddle, bottomRight, topMiddle } from '../../elements/menu/defaults'

// Since Menu wraps an anchor and renders a popover relative to it,
// we need a wrapper to manage state for the stories.

const meta: Meta<IMenuProps> = {
  title: 'Elements/Menu',
  component: Menu,
  subcomponents: { ListMenu, MenuItem } as any,
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Controls menu visibility',
    },
    align: {
      control: { type: 'object' },
      description: 'Alignment object { vertical, horizontal }',
    },
    offset: {
      control: { type: 'object' },
      description: 'Offset object { vertical, horizontal }',
    },
    origin: {
      control: { type: 'text' },
      description: 'Transform origin (e.g. "top left")',
    },
    unorderedList: {
      control: { type: 'boolean' },
      description: 'Render as <ul> instead of <nav>',
    },
  },
}

export default meta

type Story = StoryObj<IMenuProps>

const baseArgs: Partial<IMenuProps> = {
  open: false,
  align: bottomLeft.align,
  offset: bottomLeft.offset,
  origin: 'top left',
}

const MenuWrapper = (args: any) => {
    const [open, setOpen] = useState(false)
    
    // Allow external control via args
    React.useEffect(() => {
        setOpen(args.open)
    }, [args.open])

    const handleClose = () => {
        setOpen(false)
        args.onClose && args.onClose()
    }

    const toggle = () => setOpen(!open)

    return (
        <div style={{ padding: 100, display: 'flex', justifyContent: 'center' }}>
            <Menu 
                {...args} 
                open={open} 
                onClose={handleClose}
                anchor={<Button onClick={toggle}>Toggle Menu</Button>}
            >
                <div style={{ padding: 16 }}>
                    <MenuItem onClick={() => console.log('Item 1')}>Item 1</MenuItem>
                    <MenuItem onClick={() => console.log('Item 2')}>Item 2</MenuItem>
                    <MenuItem onClick={() => console.log('Item 3')}>Item 3</MenuItem>
                </div>
            </Menu>
        </div>
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <MenuWrapper {...args} />,
}

const ListMenuWrapper = (args: any) => {
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)
    const handleClose = () => setOpen(false)

    const list = [
        { id: '1', name: 'Option 1', icon: 'edit' },
        { id: '2', name: 'Option 2', icon: 'trash' },
        { id: '3', name: 'Option 3', icon: 'cog' },
    ]

    return (
        <div style={{ padding: 100, display: 'flex', justifyContent: 'center' }}>
            <ListMenu 
                {...args}
                open={open}
                onClose={handleClose}
                anchor={<Button onClick={toggle}>Open List Menu</Button>}
                list={list}
                onClick={(item) => {
                    console.log('Clicked', item)
                    handleClose()
                }}
            />
        </div>
    )
}

export const AsListMenu: Story = {
    args: baseArgs,
    render: (args) => <ListMenuWrapper {...args} />,
}

export const Gallery: Story = {
    render: (args) => (
        <div style={{ display: 'grid', gap: 100, gridTemplateColumns: '1fr 1fr' }}>
            <MenuWrapper {...args} align={bottomLeft.align} anchor={<Button>Bottom Left</Button>} />
            <MenuWrapper {...args} align={bottomRight.align} anchor={<Button>Bottom Right</Button>} />
        </div>
    )
}
