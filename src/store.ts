import { combineReducers, configureStore } from '@reduxjs/toolkit'
import themeReducers from './theme-manager/themeReducer'

// FOR TESTING PURPOSES ONLY

const rootReducer = combineReducers({
  theme: themeReducers,
})

export default configureStore({
  reducer: rootReducer,
})
