import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DocumentMeta from '../../components/DocumentMeta'
import { HeaderTitlePortal } from '../../elements/header/portals'


type DocumentMetaProps = React.ComponentProps<typeof DocumentMeta>

const meta: Meta<DocumentMetaProps> = {
  title: 'Components/DocumentMeta',
  component: DocumentMeta,
  argTypes: {
    title: { control: 'text' },
    breadcrumbs: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<DocumentMetaProps>

const baseArgs: DocumentMetaProps = {
  title: 'Page Title',
  breadcrumbs: true,
}

// Since DocumentMeta uses a portal that depends on FrameProvider context, 
// and also manages head tags, visualization is limited.
// We primarily test that it renders breadcrumbs if enabled.

const MockFrameProvider = ({ children }) => {
    // We can simulate the context if needed, but for now we just wrap it
    return <div>{children}</div>
}

export const BreadcrumbsExample: Story = {
  args: baseArgs,
  render: (args) => (
      <MockFrameProvider>
          <div style={{ border: '1px dashed #ccc', padding: 10 }}>
              <strong>Portal Content (Breadcrumbs):</strong>
              <div id="header-title-container">
                  {/* Note: In a real app this portal targets a specific DOM node. 
                      Storybook environment might not fully support this without decorators.
                  */}
                  <DocumentMeta {...args} />
              </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: '#666' }}>
              Note: This component also updates document.title and meta tags. Check the browser tab title.
          </div>
      </MockFrameProvider>
  )
}
