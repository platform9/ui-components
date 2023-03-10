import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import Text from 'src/elements/Text'
import clsx from 'clsx'
import FontAwesomeIcon from 'src/components/FontAwesomeIcon'
import CopyToClipboard from 'src/components/CopyToClipboard'

export interface TooltipProps<T> {
  items: T[]
  nameKey?: keyof T
  className?: string
  renderIcon?: (item: T) => React.ReactNode
}

export default function TooltipListBody<T>({
  items,
  className,
  nameKey,
  renderIcon,
}: TooltipProps<T>) {
  const classes = useStyles({})
  return (
    <ul className={clsx(classes.tooltipListBody, className)}>
      {items.map((item, idx) => (
        <TooltipListItem
          key={idx}
          item={item}
          nameKey={nameKey}
          isFirst={idx === 0}
          isLast={idx === items.length - 1}
          Icon={renderIcon}
        />
      ))}
    </ul>
  )
}

function TooltipListItem(props) {
  const { item, isFirst, isLast, Icon, nameKey } = props
  const classes = useStyles({ isFirst, isLast })
  const text = nameKey ? item[nameKey] : item
  // eslint-disable-next-line no-extra-boolean-cast
  const iconContent = !!Icon ? (
    <div className={classes.copyContainer}>
      <Icon {...item} className={clsx(classes.tooltipText, classes.tooltipCopyIcon)} />
    </div>
  ) : (
    <CopyToClipboard copyText={text} copyIcon={false} inline={false} triggerWithChild>
      <div className={classes.copyContainer}>
        <FontAwesomeIcon size="md" className={clsx(classes.tooltipText, classes.tooltipCopyIcon)}>
          copy
        </FontAwesomeIcon>
      </div>
    </CopyToClipboard>
  )
  return (
    <li className={classes.tooltipListItem}>
      <Text variant="body2" className={classes.tooltipText} noWrap>
        {text}
      </Text>
      {iconContent}
    </li>
  )
}
interface StyleProps {
  isFirst?: boolean
  isLast?: boolean
}
const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  tooltipListBody: {
    margin: 0,
    padding: 0,
  },
  tooltipListItem: {
    display: 'grid',
    gridTemplateColumns: '1fr max-content',
    gridAutoFlow: 'column',
    alignItems: 'center',
    gap: 16,
    paddingLeft: 8,

    borderTop: `1px solid ${theme.components.tooltip.border}`,

    '&:first-child': {
      borderTop: 'none',
    },
  },
  tooltipCopyIcon: {
    cursor: 'inherit',
    fontSize: 16,
  },
  tooltipText: {
    color: theme.components.tooltip.text,
    maxWidth: 350,
  },
  copyContainer: {
    cursor: 'pointer',
    backgroundColor: theme.components.tooltip.copyBackground,
    width: 36,
    height: 36,
    boxSizing: 'border-box',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ({ isFirst, isLast }) => {
      const tl = 0
      const tr = isFirst ? 4 : 0
      const br = isLast ? 4 : 0
      const bl = 0
      return `${tl}px ${tr}px ${br}px ${bl}px`
    },
  },
}))
