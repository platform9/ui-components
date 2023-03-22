import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { getLogs, discoverText } from './helpers'
import Theme from '../../theme-manager/themes/model'
import clsx from 'clsx'
import Text from '../../elements/Text'

const useStyles = makeStyles<Theme, { size: number }>((theme) => ({
  code: {
    display: 'grid',
    alignSelf: 'stretch',
    justifySelf: 'stretch',
    overflow: 'auto',
  },
  pre: {
    fontFamily: 'SpaceMono',
    fontWeight: 'normal',
    position: 'relative',
    margin: 0,
    fontSize: ({ size }) => size,

    '& .log-row': {
      display: 'grid',
      gridTemplateColumns: '28px 1fr',
      gridAutoFlow: 'row',
      gap: '32px',
      alignItems: 'center',
      gridAutoRows: '24px',
    },
    '& .log-line-number': {
      justifySelf: 'end',
    },
    '& .log-bit': {
      padding: theme.spacing(0, 0.5),
    },
    '& .log-type-code-blue': {
      color: theme.components.code.text,
    },
    '& .log-type-default': {
      color: theme.components.card.text,
      padding: theme.spacing(0, 0.5),
    },
  },
}))

function formatLog({ log, idx, lineNumbers }) {
  const bits = log.split(' ').filter((l) => !!l || !!l.trim())
  const elems = bits.map((bit, index) => {
    const color = discoverText(bit, index)
    return (
      <span key={`log-type-${index}`} className={`log-bit log-type-${color}`}>
        {bit}
      </span>
    )
  })
  return (
    <div key={`log-${idx}`} className="log-row">
      {lineNumbers && (
        <Text variant="body2" className="log-line-number">
          {idx}
        </Text>
      )}
      <div>{elems}</div>
    </div>
  )
}

export default function LogViewer({
  logs,
  size = 14,
  lineNumbers = false,
  className = undefined,
  extraLines = 'none',
}: Props) {
  const classes = useStyles({ size })
  const logsAsArr = getLogs(logs)
  const content = logsAsArr.map((log, idx) => formatLog({ log, idx, lineNumbers }))

  return (
    <code className={clsx(classes.code, className)}>
      <pre className={classes.pre}>
        {(extraLines === 'top' || extraLines === 'both') && <div>&nbsp;</div>}
        {content}
        {(extraLines === 'bottom' || extraLines === 'both') && <div>&nbsp;</div>}
      </pre>
    </code>
  )
}

interface Props {
  logs: string | string[]
  size?: number
  lineNumbers?: boolean
  className?: string
  extraLines?: 'none' | 'top' | 'bottom' | 'both'
}
