import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Text from '../elements/Text'
import Theme from '../theme-manager/themes/model'

interface Props {
  keyValuePairs: KeyValuePair[]
  rowSpacing?: number
  limitValueLength?: boolean
  alignKeyRight?: boolean
}

interface KeyValuePair {
  key: string
  value: any // Might be an object or a string
  render?: any // Having trouble debugging this
}

const useStyles = makeStyles<any, Partial<Props>>((theme: Theme) => ({
  table: {
    borderSpacing: ({ rowSpacing }) => `0px ${rowSpacing}px`,
    width: '100%',
  },
  td: {
    fontFamily: theme.typography.body2.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    fontStretch: theme.typography.body2.fontStretch,
    fontStyle: theme.typography.body2.fontStyle,
    lineHeight: theme.typography.body2.lineHeight,
    letterSpacing: theme.typography.body2.letterSpacing,
    padding: 0,
    verticalAlign: 'top',
    wordBreak: 'break-word',
  },
  key: {
    textAlign: ({ alignKeyRight }) => (alignKeyRight ? `right` : 'left'),
    whiteSpace: 'nowrap',
    minWidth: '120px',
  },
  value: {
    paddingLeft: theme.spacing(2.5),
    width: '100%',
  },
  showMoreButton: {
    cursor: 'pointer',
  },
  showMoreText: {
    color: theme.palette.blue[500],
  },
}))

const KeyValue = ({ pair, limitValueLength = false, alignKeyRight = true }) => {
  const { key = '', value = '', render = null } = pair || {}
  const classes = useStyles({ alignKeyRight })
  const [showAll, setShowAll] = useState(false)
  const valueToShow =
    limitValueLength && !showAll && value.length > 350 ? value.substring(0, 350) : value

  return (
    <Text variant="body2" component="tr" key={key}>
      <td className={clsx(classes.td, classes.key)}>{key}:</td>
      {render ? (
        <td className={clsx(classes.td, classes.value)}>{render(value)}</td>
      ) : (
        <td className={clsx(classes.td, classes.value)}>
          <Text variant="body2" component="div">
            {valueToShow}
          </Text>
          {limitValueLength && value.length > 350 && (
            <div className={classes.showMoreButton} onClick={() => setShowAll(!showAll)}>
              <Text className={classes.showMoreText} variant="caption1">
                {showAll ? 'Show Less' : 'Show More'}
              </Text>
            </div>
          )}
        </td>
      )}
    </Text>
  )
}

const DisplayKeyValues = ({ keyValuePairs, rowSpacing = 12, ...rest }: Props) => {
  const classes = useStyles({ rowSpacing })

  return (
    <table className={classes.table}>
      <tbody>
        {keyValuePairs.map((pair) => {
          return <KeyValue key={pair?.key} {...rest} pair={pair} />
        })}
      </tbody>
    </table>
  )
}

export default DisplayKeyValues
