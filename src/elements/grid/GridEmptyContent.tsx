// Libs
import React, { FC, PropsWithChildren } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import Text from '../../elements/Text'
import generateTestId from '../../utils/test-helpers'

interface Props {
  message?: string
  defaultHeight?: number
  variant?: 'dark' | 'light'
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
  messageContainer: {
    minHeight: ({ defaultHeight }) => `${defaultHeight}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const GridEmptyContent: FC<PropsWithChildren<Props>> = ({
  children,
  defaultHeight = 150,
  variant = 'dark',
}) => {
  const { messageContainer } = useStyles({ defaultHeight, variant })
  return (
    <div className={messageContainer}>
      {typeof children === 'string' ? (
        <Text data-testid={generateTestId('no', 'data', 'found')} variant="subtitle2">
          {children}
        </Text>
      ) : (
        children
      )}
    </div>
  )
}

export default GridEmptyContent
