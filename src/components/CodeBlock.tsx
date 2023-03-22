import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import clsx from 'clsx'

interface Props {
  overflow?: boolean
  fill?: boolean
  className?: any
  children: any
}

interface StyleProps {
  fill?: boolean
  overflow?: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  pre: {
    padding: '6px 10px',
    margin: 0,
    fontFamily: 'SpaceMono',
    fontWeight: 'normal',
    borderRadius: 4,
    display: ({ fill }) => (fill ? 'flex' : 'inline-block'),
    backgroundColor: theme.components.code.background,
    color: theme.components.code.text,
    wordBreak: 'break-all',
    whiteSpace: ({ overflow }) => (overflow ? 'pre' : 'pre-wrap'),
    maxHeight: ({ fill }) => (fill ? 'initial' : 400),
    overflow: 'auto',
    flexGrow: ({ fill }) => (fill ? 1 : 0),

    '& *': {
      fontFamily: 'SpaceMono',
    },
  },
}))

const CodeBlock: FunctionComponent<Props> = ({
  overflow = false,
  children,
  className,
  fill = false,
}) => {
  const styles = useStyles({ fill, overflow })
  return (
    <pre className={clsx(styles.pre, 'thin-scrollbar', className)}>
      <code>{children}</code>
    </pre>
  )
}

export default CodeBlock
