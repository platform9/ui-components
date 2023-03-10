import React, { useState, useEffect } from 'react'
import store, { themeActions } from '../src/store'
import { Provider } from 'react-redux'
import defaultTheme from './default-theme'
import colors from '../src/theme-manager/themes/base/colors'
import ThemeManager from '../src/theme-manager/ThemeManager'
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs'

const DelayedRender = ({ children, delay = 100 }) => {
  const [timeoutEnded, setTimeoutEnded] = useState(false)
  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return
    }

    const id = setTimeout(() => setTimeoutEnded(true), delay)

    return () => clearTimeout(id)
  }, [delay])

  return timeoutEnded ? children : null
}

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeManager themeActions={themeActions}>
        <DelayedRender delay={100}>
          <Story />
        </DelayedRender>
      </ThemeManager>
    </Provider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: defaultTheme,
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <ArgsTable story={PRIMARY_STORY} />
        <Stories />
      </>
    ),
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: colors.grey[200],
      },
      {
        name: 'dark',
        value: colors.grey[700],
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// }
