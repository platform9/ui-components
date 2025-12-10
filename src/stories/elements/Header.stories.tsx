import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Header from '../../elements/header/Header'
import { HeaderTitlePortal, HeaderPrimaryActionPortal, HeaderDefaultToolsPortal } from '../../elements/header/portals'
import FrameContext, { IFrameContextRefs } from '../../providers/frame-provider'
import Button from '../../elements/button/Button'
import Text from '../../elements/Text'

// Mock Frame Provider
const MockFrameProvider = ({ children }) => {
    const [refs, setRefs] = useState<IFrameContextRefs>({
        sidebarPaneContainer: null,
        headerTitleContainer: null,
        headerPrimaryActionContainer: null,
        headerSharedToolsContainer: null,
        contentMainContainer: null,
    })

    const setFrameContainerRef = (payload: Partial<IFrameContextRefs>) => {
        setRefs(prev => ({ ...prev, ...payload }))
    }

    return (
        <FrameContext.Provider value={{ ...refs, setFrameContainerRef }}>
            {children}
        </FrameContext.Provider>
    )
}

const meta: Meta<typeof Header> = {
  title: 'Elements/Header',
  component: Header,
  decorators: [
      (Story) => (
          <MockFrameProvider>
              <div style={{ border: '1px solid #ccc' }}>
                <Story />
              </div>
          </MockFrameProvider>
      )
  ]
}

export default meta

type Story = StoryObj<typeof Header>

const HeaderContent = () => (
    <>
        <HeaderTitlePortal>
            <Text variant="h3">Page Title</Text>
        </HeaderTitlePortal>
        <HeaderPrimaryActionPortal>
            <Button variant="primary">Primary Action</Button>
        </HeaderPrimaryActionPortal>
        <HeaderDefaultToolsPortal>
            <Button variant="secondary" icon="cog">Settings</Button>
        </HeaderDefaultToolsPortal>
    </>
)

export const Default: Story = {
  render: () => (
      <>
        <Header />
        {/* Render content into portals after Header mounts and sets refs */}
        <HeaderContent />
      </>
  ),
}

export const Empty: Story = {
    render: () => <Header />
}
