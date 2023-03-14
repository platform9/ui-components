import { ThemeProvider } from '@material-ui/styles'
import { createTheme } from '@material-ui/core/styles'

import React, { PropsWithChildren, useContext, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppTheme from 'src/theme-manager/themes/model'
import { themeSelector } from './selector'
import * as CSS from 'csstype'
import { themeActions } from '../store'
import { defaultThemeState, ThemeReducer } from './createThemeSlice'
import darkTheme from './themes/modes/dark'
import colors from './themes/base/colors'
import { CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit/dist/createSlice'

const CustomThemeContext = React.createContext<{
  theme: AppTheme
  setCustomTheme: (theme: AppTheme) => void
}>({
  theme: null,
  setCustomTheme: (theme) => {
    throw new Error('CustomThemeProvider not found')
  },
})

export const CustomThemeConsumer = CustomThemeContext.Consumer
export const CustomThemeProvider = CustomThemeContext.Provider

export const loadingStyles: CSS.Properties = {
  width: '100%',
  fontSize: '20px',
  textAlign: 'center',
  marginTop: '4rem',
}

interface Props {
  themeActions: any
}

export default function ThemeManager({ themeActions, children }: PropsWithChildren<Props>) {
  const dispatch = useDispatch()
  const jsonTheme = useSelector(themeSelector)

  const setCustomTheme = useCallback<(theme: AppTheme) => void>(
    (customTheme: AppTheme, updateUserPrefs = true) => {
      dispatch(themeActions.updateTheme(customTheme))
    },
    [jsonTheme],
  )

  // TODO: Our current theme (AppTheme) is not extending the MUI theme correctly
  // Until we fix it we have to trick the TS engine to swallow this
  const theme = useMemo(() => createTheme(jsonTheme as unknown), [jsonTheme]) as AppTheme

  // // Rendering the app before the theme is loaded will have issues because `withStyles`
  // // requires the `theme` object to exist.
  if (!jsonTheme) {
    return <h2 style={loadingStyles}>Loading theme...</h2>
  }

  return (
    <ThemeProvider theme={theme as AppTheme}>
      <CustomThemeProvider value={{ theme, setCustomTheme }}>{children}</CustomThemeProvider>
    </ThemeProvider>
  )
}

export function useCustomTheme(): [AppTheme, (theme: AppTheme, updateUserPrefs?: boolean) => void] {
  const { theme, setCustomTheme } = useContext(CustomThemeContext)
  return [theme, setCustomTheme]
}

export const withCustomTheme = (Component) => (props) =>
  (
    <CustomThemeConsumer>
      {({ theme, setCustomTheme }) => (
        <Component {...props} theme={theme} setCustomTheme={setCustomTheme} />
      )}
    </CustomThemeConsumer>
  )
