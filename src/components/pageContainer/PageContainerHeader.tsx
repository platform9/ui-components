import React from 'react'
import ReactDOM from 'react-dom'
import { PageContext } from 'src/components/pageContainer/PageContainer'

const PageContainerHeader = ({ children }) => {
  const { extraHeaderContainer } = React.useContext(PageContext)
  if (!extraHeaderContainer) {
    return null
  }
  return ReactDOM.createPortal(children, extraHeaderContainer)
}

export default PageContainerHeader
