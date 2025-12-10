import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CodeMirrorModal from '../../../components/codeMirror/CodeMirrorModal'
import Button from '../../../elements/button'

type CodeMirrorModalProps = React.ComponentProps<typeof CodeMirrorModal>

const meta: Meta<CodeMirrorModalProps> = {
  title: 'Components/CodeMirror/CodeMirrorModal',
  component: CodeMirrorModal,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    open: { control: 'boolean' },
    onClose: { action: 'closed' },
  },
}

export default meta

type Story = StoryObj<CodeMirrorModalProps>

const yamlContent = `apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
`

const baseArgs: CodeMirrorModalProps = {
  label: 'View Configuration',
  value: yamlContent,
  open: false,
  onClose: () => {},
}

const Wrapper = (args: CodeMirrorModalProps) => {
    const [open, setOpen] = useState(args.open)
    
    return (
        <div>
            <Button onClick={() => setOpen(true)}>Open CodeMirror Modal</Button>
            <CodeMirrorModal 
                {...args}
                open={open}
                onClose={() => {
                    setOpen(false)
                    args.onClose?.()
                }}
            />
        </div>
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />
}
