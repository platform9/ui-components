import { PropsWithChildren, useEffect } from 'react'
import { ITabContext, withTabContext } from './TabContext'

interface Props extends ITabContext {
  value: string
  label: string
}

function Tab(props: PropsWithChildren<Props>) {
  useEffect(() => {
    const { addTab, value, label } = props
    addTab({ value, label })
  }, [])

  const { activeTab, value, children } = props
  if (value !== activeTab) {
    return null
  }
  return children
}

export default withTabContext(Tab)
