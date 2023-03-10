import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import GridDefaultActionButton, {
  GridDefaultActionButtonProps,
} from 'src/elements/grid/buttons/GridDefaultActionButton'
import clsx from 'clsx'

const useStyles = makeStyles<Theme>((theme) => ({
  btn: {
    '& > .button-text > .button-icon': {
      color: theme.components.graph.error,
    },
    '& > .button-text': {
      color: theme.components.graph.error,
    },
    '&:hover > .button-text': {
      color: theme.components.graph.error,
    },
  },
}))

export default function GridDefaultDeleteButton<T>({
  children = 'Delete',
  onClick,
  className,
  ...rest
}: GridDefaultActionButtonProps<T>) {
  const classes = useStyles({})
  return (
    <GridDefaultActionButton
      {...rest}
      icon="trash-alt"
      className={clsx(className, classes.btn)}
      onClick={onClick}
    >
      {children}
    </GridDefaultActionButton>
  )
}
