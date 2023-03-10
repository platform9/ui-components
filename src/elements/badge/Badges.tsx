import React, { useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import Badge from './Badge'
import generateTestId from 'src/utils/test-helpers'
import { memoize } from 'src/utils/misc'
import { BadgesProps } from 'src/components/labels-and-annotations/model'
import Button from '../button'
import { topLeft } from '../menu/defaults'
import TooltipListBody from '../tooltip/TooltipListBody'

const defaultMaxBadgesVisible = {
  panel: 6,
  table: 3,
  string: 6,
}

const tooltipListProps = {
  ...topLeft,
  origin: 'right bottom',
}

const getDefaultEllipsisAt = memoize((entityType) =>
  entityType === 'annotations' ? 200 : entityType === 'labels' ? 15 : null,
)

export default function Badges({
  values: allItems = [],
  entityType = 'string',
  containerType = 'panel',
  variant,
  ellipsisAt: _ellipsisAt = getDefaultEllipsisAt(entityType),
  maxVisible: _maxVisible,
  showMoreButton = false,
  bold = false,
}: BadgesProps) {
  const maxVisible = _maxVisible || defaultMaxBadgesVisible[entityType]
  const ellipsisAt = containerType === 'table' ? 15 : _ellipsisAt

  const classes = useStyles({ containerType })
  const [showAll, setShowAll] = useState(false)

  const [itemsToShow, remainingLabels] = useMemo(() => {
    if (!showAll && allItems.length > maxVisible) {
      return [allItems.slice(0, maxVisible), allItems.slice(maxVisible)]
    }
    return [allItems, []]
  }, [showAll, allItems, maxVisible])

  const showButton = useMemo(() => {
    return showMoreButton && allItems.length > maxVisible
  }, [showMoreButton, allItems, maxVisible])
  return (
    <div data-testid={generateTestId(entityType)} className={classes.labelsOrAnnotations}>
      {itemsToShow.map(({ text, tooltipText, additionalText }) => (
        <Badge
          variant={variant}
          key={text}
          text={text}
          additionalText={additionalText}
          bold={bold}
          ellipsisAt={ellipsisAt}
          tooltipProps={tooltipListProps}
          tooltipBody={<TooltipListBody items={[tooltipText]} />}
        />
      ))}
      {(_maxVisible !== undefined || containerType === 'table') && allItems.length > maxVisible && (
        <Badge
          variant={variant}
          text={`+${allItems.length - maxVisible}`}
          bold={bold}
          tooltipBody={<TooltipListBody items={remainingLabels} nameKey="text" />}
          tooltipProps={tooltipListProps}
        />
      )}
      {showButton && (
        <Button className={classes.showMoreButton} onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  )
}

interface StyleProps {
  containerType: BadgesProps['containerType']
}
const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  labelsOrAnnotations: {
    display: 'flex',
    flexFlow: ({ containerType }) => (containerType === 'table' ? 'nowrap' : 'wrap'),
    maxWidth: ({ containerType }) => (containerType === 'table' ? '480px' : 'max-content'),
    overflow: 'auto',
    gap: 8,
  },
  showMoreButton: {
    borderRadius: 4,
    padding: '2px 12px 5px 12px',
    margin: theme.spacing(1),
    minHeight: 'initial',
    height: 'max-content',
  },
}))
