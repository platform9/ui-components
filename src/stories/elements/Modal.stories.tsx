import React, { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Modal from '../../elements/modal/Modal'
import Button from '../../elements/button/Button'
import Text from '../../elements/Text'

type ModalComponentProps = React.ComponentProps<typeof Modal>

const meta: Meta<ModalComponentProps> = {
  title: 'Elements/Modal',
  component: Modal,
  decorators: [
    (Story) => {
      // Create portal root for the modal
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
           // Cleanup if desired, but might interfere with other stories if they run in parallel in some environments
           // For now, leaving it is safer in single-page apps like Storybook
        }
      }, [])
      
      if (!ready) return <div>Initializing portal...</div>
      return (
          <div style={{ height: '300px', border: '1px dashed #ccc', padding: 20, position: 'relative' }}>
              <Story />
          </div>
      )
    },
  ],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Controls the visibility of the modal',
      table: { defaultValue: { summary: false } },
    },
    title: {
      control: { type: 'text' },
      description: 'Modal title',
    },
    entityName: {
      control: { type: 'text' },
      description: 'Entity name displayed next to title',
    },
    info: {
      control: { type: 'text' },
      description: 'Info text or component',
    },
    panel: {
      control: { type: 'radio' },
      options: ['drawer', 'dialog'],
      description: 'Type of modal panel',
      table: { defaultValue: { summary: 'drawer' } },
    },
    slideFrom: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Direction of slide animation',
      table: { defaultValue: { summary: 'right' } },
    },
    showOverlay: {
      control: { type: 'boolean' },
      description: 'Show backdrop overlay',
      table: { defaultValue: { summary: true } },
    },
    maxWidth: {
      control: { type: 'number' },
      description: 'Maximum width of the modal',
    },
    onClose: { action: 'closed' },
  },
}

export default meta

type Story = StoryObj<ModalComponentProps>

const baseArgs: Partial<ModalComponentProps> = {
  title: 'Modal Title',
  children: <Text>This is the content of the modal.</Text>,
  footer: (
      <>
        <Button variant="primary">Confirm</Button>
        <Button variant="secondary">Cancel</Button>
      </>
  ),
  panel: 'drawer',
}

const ModalWrapper = (args: ModalComponentProps) => {
    const [isOpen, setIsOpen] = useState(false)
    
    // Sync with args for controls
    useEffect(() => {
        setIsOpen(args.open)
    }, [args.open])

    const handleClose = () => {
        setIsOpen(false)
        args.onClose && args.onClose()
    }

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal {...args} open={isOpen} onClose={handleClose} />
        </div>
    )
}

export const Drawer: Story = {
  args: {
    ...baseArgs,
    open: false,
    panel: 'drawer',
  },
  render: (args) => <ModalWrapper {...args} />,
}

export const Dialog: Story = {
  args: {
    ...baseArgs,
    open: false,
    panel: 'dialog',
  },
  render: (args) => <ModalWrapper {...args} />,
}

export const WithEntityName: Story = {
  args: {
    ...baseArgs,
    open: false,
    entityName: 'My Entity',
    panel: 'drawer',
  },
  render: (args) => <ModalWrapper {...args} />,
}

export const CustomContent: Story = {
    args: {
        ...baseArgs,
        open: false,
        title: 'Custom Content',
        children: (
            <div style={{ display: 'grid', gap: 16 }}>
                <div style={{ height: 100, background: '#eee' }}>Block 1</div>
                <div style={{ height: 100, background: '#e0e0e0' }}>Block 2</div>
                <Text>Some text description here.</Text>
            </div>
        )
    },
    render: (args) => <ModalWrapper {...args} />,
}
