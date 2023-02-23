import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

// For testing purposes only
// import Card from './components/card/Card'
// import Text from './components/Text'
// import makeStylesWithTheme from 'src/theme-manager/makeStylesWithTheme'
// import Theme from 'src/theme-manager/themes/model'

const App = () => {
  // const classes = useStyles()
  return (
    <Provider store={store}>
      {/* For testing only */}
      {/* <div>
        <Card title="PF9 Card" className={classes.card}>
          <Text variant="h3" className={classes.text}>
            Test
          </Text>
        </Card>
      </div> */}
    </Provider>
  )
}

// For testing only
// const useStyles = makeStylesWithTheme((theme: Theme) => ({
//   card: {
//     backgroundColor: theme.palette.blue[300],
//   },
//   text: {
//     color: theme.palette.red[300],
//   },
// }))

export default App
