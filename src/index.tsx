import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import Button from './components/buttons/Button'
import { createTheme } from './helpers'
import store from './store'
import themeReducer from './theme-manager/themeReducer'
import darkTheme from './theme-manager/themes/modes/dark'
import defaultTheme from './theme-manager/themes/modes/default'
import lightTheme from './theme-manager/themes/modes/light'
import ultraDarkTheme from './theme-manager/themes/modes/ultraDarkTheme'

// FOR TESTING PURPOSES ONLY
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)

// Theme Definitions
export { defaultTheme }
export { lightTheme }
export { darkTheme }
export { ultraDarkTheme }

// Theme Reducer
export { themeReducer }

// Theme Helpers
export { createTheme }

// Components
export { Button }
