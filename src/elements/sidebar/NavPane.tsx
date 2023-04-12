import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import Text from '../Text'

type Props = PropsWithChildren<{
  className?: string
  bottomContent?: JSX.Element[]
}> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

export default function NavPane({
  className,
  title,
  children,
  bottomContent = undefined,
  ...rest
}: PropsWithChildren<Props>) {
  const hasTitle = !!title
  const classes = useStyles({ title: hasTitle })
  return (
    <nav className={clsx(classes.navPane, className)} {...rest}>
      {hasTitle && (
        <Text variant="subtitle2" component="h6" className={classes.navPaneTitle}>
          {title}
        </Text>
      )}

      <ul>{children}</ul>

      {!!bottomContent && <ul>{bottomContent}</ul>}
    </nav>
  )
}

type StyleProps = {
  title: boolean
}
const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  navPane: {
    display: 'grid',
    gridTemplateRows: ({ title }) => (title ? 'max-content 1fr max-content' : '1fr max-content'),
    paddingBottom: 16,
    '& ul': {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
  },
  navPaneTitle: {
    color: theme.components.sidebar.activeText,
  },
}))
