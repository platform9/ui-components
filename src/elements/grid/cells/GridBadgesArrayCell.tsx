import React from 'react'
import { GridCellProps } from '../../../elements/grid/hooks/useGridRows'
import { ArrayElement } from './GridArrayCell'
import Badge, { BadgeVariant } from '../../../elements/badge/Badge'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../../theme-manager/themes/model'
import TooltipListBody from '../../../elements/tooltip/TooltipListBody'

interface BaseGridArrayCellProps<K extends unknown[]> {
  badgeVariant?: BadgeVariant
  maxItems?: number
}
interface GridArrayCellProps<T, K extends unknown[] = []>
  extends GridCellProps<T, K>,
    BaseGridArrayCellProps<K> {}

export default function GridBadgesArrayCell<T, K extends unknown[]>({
  value: items = [] as K,
  badgeVariant = 'default',
  maxItems = 3,
}: GridArrayCellProps<T, K>) {
  const classes = useStyles({})
  const itemsToDisplay = items.slice(0, maxItems)

  return (
    <div className={classes.cell}>
      <div className={classes.badges}>
        {itemsToDisplay.map((item: ArrayElement<K>) => {
          const name = String(item)
          return <Badge key={name} text={name} variant={badgeVariant} />
        })}
      </div>
      {items.length > maxItems && (
        <div className={classes.additionalItemsCount}>
          <Badge
            variant={badgeVariant}
            text={`+${items.length - maxItems}`}
            tooltipBody={<TooltipListBody items={items} />}
          />
        </div>
      )}
    </div>
  )
}

export function createGridBadgesArrayCell<T, K extends unknown[]>({
  badgeVariant,
  maxItems,
}: BaseGridArrayCellProps<K>) {
  return (props: GridCellProps<T, K>) => {
    return <GridBadgesArrayCell {...props} badgeVariant={badgeVariant} maxItems={maxItems} />
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    gridGap: theme.spacing(1),
  },
  badges: {
    display: 'grid',
    gridGap: theme.spacing(1),
  },
  additionalItemsCount: {
    alignSelf: 'end',
  },
}))
