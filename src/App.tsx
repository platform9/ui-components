import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import makeStylesWithTheme from './theme-manager/makeStylesWithTheme'
import Button from './components/buttons/TestButton'
import Card from './components/card/Card'
import Text from './components/Text'
import Theme from './theme-manager/themes/model'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import { themeSelector } from './theme-manager/selector'

const useStyles = makeStylesWithTheme((theme: Theme) => ({
  testCard: {
    backgroundColor: theme.palette.blue[400],
  },
  testText: {
    color: theme.palette.blue[400],
  },
  testButton: {
    backgroundColor: theme.palette.blue[400],
    padding: '24px',
  },
}))

// FOR TESTING PURPOSES ONLY
function App() {
  const classes = useStyles()
  return (
    <>
      <Card withCustomBody className={classes.testCard}>
        <div>
          <Text variant="h2" className={classes.testText}>
            Test
          </Text>
          <Button className={classes.testButton} />
        </div>
      </Card>
    </>
  )
}

export default App
