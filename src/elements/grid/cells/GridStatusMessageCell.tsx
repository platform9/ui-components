import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../../theme-manager/themes/model'
import { isNilOrEmpty } from '../../../utils/fp'
import { GridCellProps } from '../../../elements/grid/hooks/useGridRows'
import Text from '../../../elements/Text'
import Tooltip from '../../../elements/tooltip'
import { topMiddle } from '../../../elements/menu/defaults'

export default function GridStatusMessageCell<T>({ value: status }: GridCellProps<T, any>) {
  const classes = useStyles({})
  if (isNilOrEmpty(status) || status.state === 'Running') return null
  const reason = status.reason || ''
  const message = status.message || ''
  const separator = reason && message ? ': ' : ''
  return (
    <Tooltip
      align={topMiddle.align}
      offset={topMiddle.offset}
      origin="right bottom"
      message={`${reason}${separator}${message}`}
    >
      <Text variant="body2" lineClamp={2} className={classes.clampText}>
        <b>{reason}</b>
        {separator}
        {message}
      </Text>
    </Tooltip>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  clampText: {
    maxWidth: 400,
  },
}))
