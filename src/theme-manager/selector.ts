import { createSelector } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'
import { customThemeKey, defaultThemeState } from './themeReducer'

export const themeSelector = createSelector(
  (state) => pathOr(defaultThemeState, [customThemeKey])(state),
  ({ theme, components }) => {
    return {
      ...theme,
      components,
    }
  },
)
