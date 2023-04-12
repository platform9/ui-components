import React from 'react'
import ReactDOM from 'react-dom'
import FrameContext from '../../providers/frame-provider'

export function SidebarCustomPanePortal({ children }) {
  const { sidebarPaneContainer } = React.useContext(FrameContext)
  if (!sidebarPaneContainer) return null
  return ReactDOM.createPortal(children, sidebarPaneContainer)
}

export function HeaderTitlePortal({ children }) {
  const { headerTitleContainer } = React.useContext(FrameContext)
  if (!headerTitleContainer) return null
  return ReactDOM.createPortal(children, headerTitleContainer)
}
export function HeaderPrimaryActionPortal({ children }) {
  const { headerPrimaryActionContainer } = React.useContext(FrameContext)
  if (!headerPrimaryActionContainer) return null
  return ReactDOM.createPortal(children, headerPrimaryActionContainer)
}
export function HeaderDefaultToolsPortal({ children }) {
  const { headerSharedToolsContainer } = React.useContext(FrameContext)
  if (!headerSharedToolsContainer) return null
  return ReactDOM.createPortal(children, headerSharedToolsContainer)
}
