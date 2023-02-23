import React from 'react'
import makeStylesWithTheme from './theme-manager/makeStylesWithTheme'
import Card from './components/card/Card'
import Text from './components/Text'
import Theme from './theme-manager/themes/model'

const useStyles = makeStylesWithTheme((theme: Theme) => ({
  testCard: {
    backgroundColor: theme.palette.blue[300],
  },
  testText: {
    color: theme.palette.red[300],
  },
}))

// FOR TESTING PURPOSES ONLY
function App() {
  const classes = useStyles()
  return (
    <>
      <Card title="PF9 Card" className={classes.testCard} testId="test">
        <div>
          <Text variant="h2" className={classes.testText}>
            Test
          </Text>
        </div>
      </Card>
    </>
  )
}

export default App
