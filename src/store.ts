import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createThemeSlice from './theme-manager/createThemeSlice'
import lightTheme from './theme-manager/themes/modes/light'
import darkTheme from './theme-manager/themes/modes/dark'
import CustomThemeHelper from './theme-manager/CustomThemeHelper'

// For testing purposes only. This is just to simulate what the
// app consuming this plugin would need to do to get the theme
// reducer

const customColorPalette = {
  grey: {
    '000': '#ffffff',
    '50': '#FAFAFC',
    '100': '#f5f5f9',
    '150': '#EEEEF2',
    '200': '#e6e6ea',
    '300': '#b6b6c0',
    '500': '#868696',
    '600': '#56566B',
    '650': '#4A4A61',
    '700': '#3d3d57',
    '750': '#31314B',
    '800': '#25253f',
    '900': '#0d0d28',
  },
  blue: {
    '100': '#f3fbfe',
    '200': '#cceffc',
    '300': '#82d4f2',
    '500': '#00abe8',
    '700': '#0089c7',
    '900': '#005992',
  },
  pink: {
    '100': '#FCE6EF',
    '300': '#f26aa6',
    '500': '#d82071',
    '700': '#8a003c',
    '900': '#6d0030',
  },
  yellow: {
    '100': '#FFF8E9',
    '200': '#FFECBE',
    '300': '#ffd7a2',
    '500': '#ffbf26',
    '700': '#f0aa00',
    '900': '#bf8700',
  },
  red: {
    '100': '#FFECE9',
    '300': '#ff9f8e',
    '500': '#ff4826',
    '700': '#f02500',
    '900': '#bf1e00',
  },
}

// Create an instance of CustomThemeHelper to help generate a custom theme
// It accepts a custom color definition and a typography definition as optional params
const themeHelper = new CustomThemeHelper(customColorPalette)
themeHelper.setColorPaletteOptions({
  primary: 'blue',
  secondary: 'grey',
})
// Call this setComponentsTheme method to customize the components styling. Colors is taken from
// the colors definition that you passed in earlier. If you did not supply a custom color definition, the default
// PF9 one is used
themeHelper.setComponentsTheme((colors) => ({
  card: {
    background: colors.grey[50],
  },
  badge: {
    primary: {
      color: colors.blue[300],
      background: colors.blue[500],
    },
  },
}))

const customTheme = themeHelper.generateCustomTheme()
const { customThemeKey, themeReducer, themeActions } = createThemeSlice(customTheme)

const rootReducer = combineReducers({
  [customThemeKey]: themeReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
})

export { customThemeKey, themeReducer, themeActions }
export default store
