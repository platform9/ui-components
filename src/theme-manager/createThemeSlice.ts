import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { mergeLeft } from 'ramda'
import { generateComponentColors } from './themes/helpers'
import Theme, { Components } from './themes/model'
import darkTheme from './themes/modes/dark'
import defaultTheme from './themes/modes/default'
import lightTheme from './themes/modes/light'

export interface ThemeReducer {
  theme: Theme
  components: Components
  global?: ThemeConfig
}

export interface ThemeConfig {
  headerColor?: string
  sidenavColor?: string
  logoUrl?: string
  logoSrc?: string
  logoFileName?: string
}

export interface UpdateComponentAction {
  components: ComponentPayload[]
}

export interface ComponentPayload {
  pathTo: string[]
  value: string
}

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)')

const defaultThemeToUse = prefersLightScheme.matches
  ? lightTheme
  : prefersDarkScheme.matches
  ? darkTheme
  : defaultTheme

export const defaultThemeState: ThemeReducer = {
  theme: defaultThemeToUse.theme,
  components: defaultThemeToUse.components,
  global: {},
}

export const themeKey = 'theme'

const createThemeSlice = (theme: ThemeReducer = defaultThemeState) => {
  const {
    name: customThemeKey,
    reducer: themeReducer,
    actions: themeActions,
  } = createSlice({
    name: themeKey,
    initialState: theme as ThemeReducer,
    reducers: {
      updateGlobalTheme: (state, { payload }: PayloadAction<ThemeConfig>) => {
        return { ...state, global: payload } as ThemeReducer
      },
      updateThemeComponent: (state, { payload }: PayloadAction<UpdateComponentAction>) => {
        return {
          ...state,
          components: generateComponentColors(payload, state.components),
        } as ThemeReducer
      },
      updateTheme: (state, { payload }: PayloadAction<Partial<ThemeReducer>>) => {
        return mergeLeft(payload, state) as ThemeReducer
      },
      clearTheme: () => {
        return defaultTheme as any
      },
    },
  })
  return { customThemeKey, themeReducer, themeActions }
}

export default createThemeSlice
