import { pathOr } from 'ramda'
import { createSelector } from '@reduxjs/toolkit'
import { defaultThemeState, themeKey } from './createThemeSlice'

export const themeSelector = createSelector(
  (state) => pathOr(defaultThemeState, [themeKey])(state),
  ({ theme, components }) => {
    return {
      ...theme,
      components,
    }
  },
)
