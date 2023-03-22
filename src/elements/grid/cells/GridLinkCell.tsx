import React from 'react'
import { GridCellProps } from '../../../elements/grid/hooks/useGridRows'
import SimpleLink from '../../../components/SimpleLink'
import GridDefaultCell from './GridDefaultCell'

interface BaseGridLinkCellProps<T> {
  routeToFn: (item: T) => string
}
interface GridLinkCellProps<T> extends GridCellProps<T>, BaseGridLinkCellProps<T> {}

export default function GridLinkCell<T>({ children, item, routeToFn }: GridLinkCellProps<T>) {
  const route = routeToFn(item)
  if (!route) {
    return <GridDefaultCell>{children}</GridDefaultCell>
  }
  return (
    <SimpleLink lineClamp={3} src={route}>
      {children}
    </SimpleLink>
  )
}

export function createGridLinkCell<T>({ routeToFn }: BaseGridLinkCellProps<T>) {
  return (props: GridCellProps<T>) => {
    return <GridLinkCell {...props} routeToFn={routeToFn} />
  }
}
