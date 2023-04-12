import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import FrameContext from '../../providers/frame-provider'

const useStyles = makeStyles<Theme>((theme) => ({
  header: {
    backgroundColor: theme.components.header.background,
    height: 64,
    gap: 16,
    padding: '0px 32px',
    display: 'grid',
    gridTemplateColumns: 'minmax(200px, 1fr) max-content max-content',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    gap: 16,
  },
  leftMargin: {
    marginLeft: 28,
  },
}))

const headerTitleRef = React.createRef<HTMLDivElement>()
const headerActionRef = React.createRef<HTMLDivElement>()
const headerDefaultToolsRef = React.createRef<HTMLDivElement>()

export default function Header() {
  const classes = useStyles({})
  const { setFrameContainerRef } = React.useContext(FrameContext)

  useEffect(() => {
    setFrameContainerRef({
      headerTitleContainer: headerTitleRef.current,
      headerPrimaryActionContainer: headerActionRef.current,
      headerSharedToolsContainer: headerDefaultToolsRef.current,
    })
  }, [])

  return (
    <header className={classes.header}>
      <div className={classes.content} ref={headerTitleRef} />
      <div className={classes.content} ref={headerActionRef} />
      <div className={classes.content} ref={headerDefaultToolsRef} />
    </header>
  )
}
