import React, { useCallback, useState, useMemo, PropsWithChildren } from 'react'
import useReactRouter from 'use-react-router'
import { makeStyles } from '@material-ui/styles'

import Theme from 'src/theme-manager/themes/model'
import { Route } from 'src/misc/route'
import { TabContext } from './TabContext'
import TabPreview from './TabPreview'

// import { HeaderTitlePortal } from 'src/elements/header/portals'

interface Props {
  // Use these props if getting active tab from url
  route?: Route
  routeKey?: string

  // Use these props if active tab is passed in (eg. card tabs)
  activeTab?: string
  setActiveTab?: (value) => void

  // use this flag if you want the tab previews to be portaled to the header
  previewInHeader?: boolean

  // use for any additional cb logic you need
  onClick?: (tab: string) => void

  HeaderTitlePortal?: React.ComponentType<any>
}

export default function Tabs({
  route,
  routeKey = 'tab',
  activeTab,
  setActiveTab,
  onClick,
  children,
  previewInHeader,
  HeaderTitlePortal,
}: PropsWithChildren<Props>) {
  const {
    history,
    match: { params },
  } = useReactRouter()
  const classes = useStyles({ previewInHeader })
  const currentTab = route && routeKey ? params[routeKey] : activeTab

  const [tabs, setTabs] = useState([])
  const addTab = useCallback(
    (tab) => {
      setTabs((tabs) => Array.from(new Set([...tabs, tab])))
    },
    [setTabs],
  )
  const handleClick = useCallback(
    (tab) => {
      if (!!onClick) {
        onClick(tab)
      }
      if (route && routeKey) {
        history.push(route.path({ ...params, [routeKey]: tab }))
      } else {
        setActiveTab(tab)
      }
    },
    [route, routeKey, params, setActiveTab],
  )
  const providerValue = useMemo(
    () => ({
      activeTab: currentTab,
      addTab,
    }),
    [currentTab, addTab],
  )
  const Container = previewInHeader ? HeaderTitlePortal : React.Fragment
  return (
    <>
      <Container>
        <div className={classes.tabsPreviewContainer}>
          {tabs.map((tab) => (
            <TabPreview
              key={tab.value}
              value={tab.value}
              label={tab.label}
              isActive={currentTab === tab.value}
              onClick={handleClick}
            />
          ))}
        </div>
      </Container>
      <TabContext.Provider value={providerValue}>{children}</TabContext.Provider>
    </>
  )
}

const useStyles = makeStyles<Theme, { previewInHeader: boolean }>((theme) => ({
  tabsPreviewContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    justifyContent: 'start',
    gap: 4,
    borderBottom: `1px solid ${theme.components.tab.border}`,
    marginBottom: ({ previewInHeader }) => (previewInHeader ? 0 : 16),
    marginTop: ({ previewInHeader }) => (previewInHeader ? 16 : 0),
  },
}))
