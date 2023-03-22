import React, { PropsWithChildren, useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import Card from '../elements/card'
// import { useCustomTheme } from '../themes/ThemeManager'

import Dropdown from '../elements/dropdown'
import { ThemeLabels, themesByKey } from '../theme-manager/themes/modes'
import { useCustomTheme } from '../theme-manager/ThemeManager'

interface StyleProps {
  padding?: string | number
  variant?: 'card' | 'frame'
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  columnLayout: {
    display: 'grid',
    gridAutoFlow: 'row',
    justifyItems: 'center',
    alignItems: 'center',
    gap: 16,
    padding: ({ padding }) => padding,
    backgroundColor: ({ variant }) => theme.components[variant]?.background,
  },
  rowLayout: {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: 16,
    padding: ({ padding }) => padding,
  },
  container: {
    position: 'relative',
    minHeight: 200,
    display: 'grid',
    padding: ({ padding }) => padding,
  },
  themeSelector: {
    position: 'absolute',
    inset: '0 0 auto auto',
  },
}))

export function Container({
  children,
  title = undefined,
  padding = 0,
}: PropsWithChildren<StyleProps & { title?: string }>) {
  const classes = useStyles({ padding })
  return (
    <Card className={classes.container} title={title} withCustomBody>
      {children}
    </Card>
  )
}

export function ThemedContainer({
  children,
  padding = '40px 0',
}: PropsWithChildren<StyleProps & { title?: string }>) {
  const [theme, setCurrentTheme] = useCustomTheme()
  const handleChange = useCallback((value) => {
    setCurrentTheme(value, false)
  }, [])
  const items = useMemo(
    () =>
      Object.entries(themesByKey).map(([key, theme]) => ({
        key,
        label: ThemeLabels[key],
        value: theme,
      })),
    [],
  )
  const classes = useStyles({ padding })
  return (
    <Card
      className={classes.container}
      title={
        <Dropdown
          compact
          width={100}
          className={classes.themeSelector}
          items={items}
          value={theme}
          onChange={handleChange}
        />
      }
      withCustomBody
    >
      {children}
    </Card>
  )
}

export function Column({
  children,
  variant = 'card',
  padding = '8px 16px',
}: PropsWithChildren<StyleProps>) {
  const classes = useStyles({ variant, padding })
  return <div className={classes.columnLayout}>{children}</div>
}

export function Row({ children, padding = '0' }: PropsWithChildren<StyleProps>) {
  const classes = useStyles({ padding })
  return <div className={classes.rowLayout}>{children}</div>
}
