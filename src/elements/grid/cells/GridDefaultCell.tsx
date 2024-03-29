import React from 'react'
import Text from '../../../elements/Text'
import { GridCellProps } from '../../../elements/grid/hooks/useGridRows'
import clsx from 'clsx'

export default function GridDefaultCell<T>({ children, title, className }: GridCellProps<T>) {
  return (
    <Text
      variant="body2"
      component="p"
      className={clsx(className, 'grid-cell')}
      lineClamp={2}
      title={title}
    >
      {children}
    </Text>
  )
}
