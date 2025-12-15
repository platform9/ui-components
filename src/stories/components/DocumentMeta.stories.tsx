import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import DocumentMeta from '../../components/DocumentMeta'
import { HeaderTitlePortal } from '../../elements/header/portals'
import Plugin from '../../plugins/plugin'
import pluginManager from '../../plugins/pluginManager'
import { Route } from '../../plugins/route'


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

const mockRoutes = [
  {
    url: '/my-plugin/page1',
    name: 'Page 1',
    breadcrumbs: new Map([['My Plugin', '/my-plugin'], ['Page 1', '/my-plugin/page1']]),
    link: {
      path: '/my-plugin/page1',
      name: 'Page 1',
      icon: 'my-icon',
    },
    component: () => <div />,
  },
]

class MockPlugin extends Plugin {
  constructor() {
    super('my-plugin', 'My Plugin', '/my-plugin', 'my-icon', true)
    this.registerRoutes(mockRoutes)
  }
}

const mockPluginInstance = new MockPlugin()
pluginManager.registerPlugin(mockPluginInstance)
const route = new Route(mockRoutes[0])
// @ts-ignore
Route.currentRoute = route

const MockFrameProvider = ({ children }) => {
    // We can simulate the context if needed, but for now we just wrap it
    return <div>{children}</div>
}

export const BreadcrumbsExample: Story = {
  args: baseArgs,
  render: (args) => (
      <MemoryRouter initialEntries={['/my-plugin/page1']}>
        <MockFrameProvider>
            <div style={{ border: '1px dashed #ccc', padding: 10 }}>
                <strong>Portal Content (Breadcrumbs):</strong>
                <div id="header-title-container">
                    <DocumentMeta {...args} />
                </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: '#666' }}>
                Note: This component also updates document.title and meta tags. Check the browser tab title.
            </div>
        </MockFrameProvider>
    </MemoryRouter>
  )
}
