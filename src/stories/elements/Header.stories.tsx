import React, { useState, useContext, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ReactDOM from 'react-dom'

import Header from '../../elements/header/Header'
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

const HeaderTitlePortal = ({ children }) => {
  const { headerTitleContainer } = useContext(FrameContext)
  if (!headerTitleContainer) return null
  return ReactDOM.createPortal(children, headerTitleContainer)
}
const HeaderPrimaryActionPortal = ({ children }) => {
  const { headerPrimaryActionContainer } = useContext(FrameContext)
  if (!headerPrimaryActionContainer) return null
  return ReactDOM.createPortal(children, headerPrimaryActionContainer)
}
const HeaderDefaultToolsPortal = ({ children }) => {
  const { headerSharedToolsContainer } = useContext(FrameContext)
  if (!headerSharedToolsContainer) return null
  return ReactDOM.createPortal(children, headerSharedToolsContainer)
}

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
  render: function DefaultStory() {
    const { headerTitleContainer, headerPrimaryActionContainer, headerSharedToolsContainer } = useContext(FrameContext);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      if (headerTitleContainer && headerPrimaryActionContainer && headerSharedToolsContainer) {
        setIsReady(true);
      }
    }, [headerTitleContainer, headerPrimaryActionContainer, headerSharedToolsContainer]);

    return (
      <>
        <Header />
        <HeaderContent />
        {/* {isReady ? <HeaderContent /> : null} */}
      </>
    );
  },
}

export const Empty: Story = {
    render: () => <Header />
}
