import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createThemeSlice from './theme-manager/createThemeSlice'
import lightTheme from './theme-manager/themes/modes/light'
import darkTheme from './theme-manager/themes/modes/dark'

// For testing purposes only. This is just to simulate what the
// app consuming this plugin would need to do to get the theme
// reducer

const { customThemeKey, themeReducer, themeActions } = createThemeSlice(darkTheme)

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
