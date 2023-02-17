import React from 'react'
import { makeStyles } from '@material-ui/core'
import useStylesWithTheme from './theme-manager/useStylesWithTheme'
import Button from './components/buttons/TestButton'
import Card from './components/card/Card'
import Text from './components/Text'

// FOR TESTING PURPOSES ONLY
function App() {
  const classes = useStylesWithTheme(stylesCreator)
  console.log('app')
  // const classes = useStyles()
  return (
    <>
      <Card title="PF9 Card Component" className={classes.testCard}>
        <div>
          <Text variant="h2" className={classes.testText}>
            Hello
          </Text>
          <Button className={classes.testButton} />
        </div>
      </Card>
    </>
  )
}

const stylesCreator = (theme) => ({
  testCard: {
    backgroundColor: theme.palette.blue[300],
  },
  testText: {
    color: theme.palette.blue[300],
  },
  testButton: {
    backgroundColor: theme.palette.blue[300],
    padding: '24px',
  },
})

// const useStyles = makeStyles({
//   testCard: {
//     backgroundColor: 'green',
//   },
//   testText: {
//     color: 'green',
//   },
//   testButton: {
//     color: 'green',
//   },
// })

export default App
