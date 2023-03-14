import React from 'react'

export interface ITabContext {
  activeTab: string
  addTab: (fields: { value: string; label: string }) => void
}
export const TabContext = React.createContext<ITabContext>({
  activeTab: null,
  addTab: (fields) => null,
})

export const withTabContext = (Component: any) => (props) => {
  return (
    <TabContext.Consumer>
      {({ activeTab, addTab }) => <Component {...props} activeTab={activeTab} addTab={addTab} />}
    </TabContext.Consumer>
  )
}
