import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'

import store, { themeActions } from './store'
import ThemeManager from './theme-manager/ThemeManager'

type AllProvidersProps = {
  children?: React.ReactNode
}

const AllProviders: React.FC<AllProvidersProps> = ({ children }) => (
  <Provider store={store}>
    <ThemeManager themeActions={themeActions}>{children}</ThemeManager>
  </Provider>
)

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
