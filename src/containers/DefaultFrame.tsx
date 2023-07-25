import React, { useState, useCallback, useMemo, useEffect, PropsWithChildren } from 'react'
import clsx from 'clsx'
import { mergeLeft } from 'ramda'
import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import Header from '../elements/header/Header'
import FrameContext, { IFullFrameContext, IFrameContextRefs } from '../providers/frame-provider'

const sidebarPane = 'default'

const sidebarPaneRef = React.createRef<HTMLDivElement>()

function DefaultFrame({ className, children }: PropsWithChildren<{ className?: string }>) {
  const [frameRefs, setFrameRefs] = useState<IFullFrameContext>({} as any)
  const setFrameContainerRef = useCallback(
    (payload: Partial<IFrameContextRefs>) => setFrameRefs((frames) => mergeLeft(frames, payload)),
    [setFrameRefs],
  )
  const classes = useStyles({ sidebarPane })

  useEffect(() => {
    setFrameContainerRef({
      sidebarPaneContainer: sidebarPaneRef.current,
    })
  }, [])

  const frameValue = useMemo(
    () => ({
      ...frameRefs,
      setFrameContainerRef,
    }),
    [frameRefs, setFrameContainerRef],
  )

  return (
    <FrameContext.Provider value={frameValue}>
      <main className={clsx(classes.appFrame, className)}>
        <Header />
        <aside className="sidebar custom-nav" ref={sidebarPaneRef} />
        <section className={clsx('content-main', classes.contentMain)}>{children}</section>
      </main>
    </FrameContext.Provider>
  )
}

const useStyles = makeStyles<Theme, { sidebarPane: string }>((theme: Theme) => ({
  appFrame: {
    position: 'relative',
    display: 'grid',
    backgroundColor: theme.components.frame.background,
    width: '100vw',
    height: '100vh',
    maxWidth: '100vw',
    maxHeight: '100vh',
    gridTemplateRows: 'minmax(65px, max-content) 1fr',
    gridTemplateColumns: 'max-content 1fr',
    gridTemplateAreas: ({ sidebarPane }) =>
      sidebarPane === 'custom'
        ? '"frame-nav frame-content"'
        : '"frame-nav frame-header" "frame-nav frame-content"',

    '& > header': {
      gridArea: 'frame-header',
      visibility: ({ sidebarPane }) => (sidebarPane === 'custom' ? 'hidden' : 'visible'),
      position: ({ sidebarPane }) => (sidebarPane === 'custom' ? 'absolute' : 'inherit'),
    },
    '& > aside': {
      gridArea: 'frame-nav',
    },
    '& > section': {
      gridArea: 'frame-content',
    },

    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '100%',
      height: 1,
      backgroundColor: theme.components.sidebar.border,
    },
  },
  contentMain: {
    display: 'grid',
    padding: '16px 32px',
    overflow: 'auto',
    gridAutoRows: 'max-content',

    // FF supports these fields but not webkit
    scrollbarColor: `${theme?.components?.scrollbar?.thumb} ${theme?.components?.frame?.background}`,
    scrollbarWidth: 'thin',

    '@media screen and (max-width: 768px)': {
      // iOS fix for momentum scrolling
      '-webkit-overflow-scrolling': 'touch',
    },
  },
  secondaryHeader: {
    zIndex: 1100,
  },
}))

export default DefaultFrame
