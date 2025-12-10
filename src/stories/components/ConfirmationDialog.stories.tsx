import React, { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ConfirmationDialog from '../../components/ConfirmationDialog'
import Button from '../../elements/button/Button'

// Reusing portal setup from Modal stories
const PortalDecorator = (Story) => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const rootId = 'modal-portal-root'
    let el = document.getElementById(rootId)
    if (!el) {
      el = document.createElement('div')
      el.id = rootId
      document.body.appendChild(el)
    }
    setReady(true)
    return () => {
        // cleanup
    }
  }, [])
  
  if (!ready) return <div>Initializing portal...</div>
  return <Story />
}

type ConfirmationDialogProps = React.ComponentProps<typeof ConfirmationDialog>

const meta: Meta<ConfirmationDialogProps> = {
  title: 'Components/ConfirmationDialog',
  component: ConfirmationDialog,
  decorators: [PortalDecorator],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Controls visibility',
    },
    title: {
      control: { type: 'text' },
      description: 'Dialog title',
    },
    text: {
      control: { type: 'text' },
      description: 'Dialog content text',
    },
    confirmText: {
      control: { type: 'text' },
      description: 'Confirm button text',
    },
    cancelText: {
      control: { type: 'text' },
      description: 'Cancel button text',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state for confirm button',
    },
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'cancelled' },
  },
}

export default meta

type Story = StoryObj<ConfirmationDialogProps>

const baseArgs: ConfirmationDialogProps = {
  open: false,
  title: 'Confirm Action',
  text: 'Are you sure you want to proceed with this action?',
  confirmText: 'Yes, Proceed',
  cancelText: 'Cancel',
}

const Wrapper = (args: ConfirmationDialogProps) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(args.open)
    }, [args.open])

    const handleClose = () => {
        setOpen(false)
        args.onCancel?.()
    }

    const handleConfirm = () => {
        console.log('Confirmed')
        setOpen(false)
        args.onConfirm?.()
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Open Confirmation Dialog</Button>
            <ConfirmationDialog 
                {...args} 
                open={open} 
                onCancel={handleClose} 
                onConfirm={handleConfirm}
            />
        </div>
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />,
}

export const Loading: Story = {
  args: {
    ...baseArgs,
    loading: true,
  },
  render: (args) => <Wrapper {...args} />,
}

export const WithError: Story = {
  args: {
    ...baseArgs,
    error: {
        title: 'Action Failed',
        message: 'There was an error processing your request.'
    },
  },
  render: (args) => <Wrapper {...args} />,
}

export const CustomFooter: Story = {
  args: {
    ...baseArgs,
    customFooterActions: (
        <div style={{ display: 'flex', gap: 10, width: '100%', justifyContent: 'flex-end' }}>
             <Button variant="tertiary">Custom 1</Button>
             <Button variant="primary">Custom 2</Button>
        </div>
    )
  },
  render: (args) => <Wrapper {...args} />,
}
