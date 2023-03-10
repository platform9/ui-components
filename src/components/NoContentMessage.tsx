// Libs
import React, { PropsWithChildren } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'

import Text from 'src/elements/Text'
import generateTestId from 'src/utils/test-helpers'
import CardBody from 'src/elements/card/CardBody'
import Card from 'src/elements/card'

interface Props {
  message?: string
  defaultHeight?: number
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
  messageContainer: {
    marginTop: theme.spacing(2),
    minHeight: ({ defaultHeight }) => `${defaultHeight}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default function NoContentMessage({
  children,
  message,
  defaultHeight = 200,
}: PropsWithChildren<Props>) {
  const classes = useStyles({ defaultHeight })
  return (
    <Card withCustomBody>
      <CardBody className={classes.messageContainer}>
        {message ? (
          <Text data-testid={generateTestId('no', 'data', 'found')} variant="subtitle2">
            {message}
          </Text>
        ) : (
          children
        )}
      </CardBody>
    </Card>
  )
}
