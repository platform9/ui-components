import React from 'react'
import ReactDOM from 'react-dom'
import FrameContext from '../../providers/frame-provider'

// Note: These components are defined as constants and exported in a single
// block at the end of the file. This pattern is used to prevent circular
// dependency issues that can arise when these portals are imported into
// other components that are also part of the header module.
// For more context, see: https://railsware.com/blog/how-to-analyze-circular-dependencies-in-es6/

const SidebarCustomPanePortal = ({ children }) => {
  const { sidebarPaneContainer } = React.useContext(FrameContext)
  if (!sidebarPaneContainer) return null
  return ReactDOM.createPortal(children, sidebarPaneContainer)
}

const HeaderTitlePortal = ({ children }) => {
  const { headerTitleContainer } = React.useContext(FrameContext)
  if (!headerTitleContainer) return null
  return ReactDOM.createPortal(children, headerTitleContainer)
}
const HeaderPrimaryActionPortal = ({ children }) => {
  const { headerPrimaryActionContainer } = React.useContext(FrameContext)
  if (!headerPrimaryActionContainer) return null
  return ReactDOM.createPortal(children, headerPrimaryActionContainer)
}
const HeaderDefaultToolsPortal = ({ children }) => {
  const { headerSharedToolsContainer } = React.useContext(FrameContext)
  if (!headerSharedToolsContainer) return null
  return ReactDOM.createPortal(children, headerSharedToolsContainer)
}

export {
    SidebarCustomPanePortal,
    HeaderTitlePortal,
    HeaderPrimaryActionPortal,
    HeaderDefaultToolsPortal,
}
