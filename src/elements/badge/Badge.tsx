import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import Tooltip, { TooltipProps } from 'src/elements/tooltip/Tooltip'
import { topMiddle } from 'src/elements/menu/defaults'

import Text from 'src/elements/Text'
import { lightenDarkenColor, memoize } from 'src/utils/misc'
import generateTestId from 'src/utils/test-helpers'
import clsx from 'clsx'

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'unknown'
  | 'danger'
  | 'error'
interface BadgeProps {
  text: string
  additionalText?: string
  variant: BadgeVariant
  ellipsisAt?: number
  canDismissEllipsis?: boolean
  bold?: boolean
  tooltipBody?: React.ReactNode
  tooltipProps?: Partial<TooltipProps>
  className?: string
}
const defaultTooltipProps = {
  ...topMiddle,
  origin: 'right bottom',
}

const defaultVariant = 'default'

const getTooltipProps = memoize((tooltipBody, text) => {
  if (tooltipBody && typeof tooltipBody !== 'string') return { customBody: tooltipBody }
  return { message: tooltipBody ?? text }
})

export default function Badge({
  text,
  additionalText,
  variant = defaultVariant,
  ellipsisAt = 15,
  canDismissEllipsis = false,
  bold = true,
  tooltipBody = undefined,
  tooltipProps = defaultTooltipProps,
  className,
}: BadgeProps) {
  const classes = useStyles({ variant })
  const [showAll, setShowAll] = useState(false)
  const shouldTruncateText = !showAll && text.length > ellipsisAt && ellipsisAt !== null
  const textToShow = shouldTruncateText ? text.substring(0, ellipsisAt) : text
  return (
    <Tooltip {...tooltipProps} {...getTooltipProps(tooltipBody, text)}>
      <div className={clsx(classes.badge, className)}>
        <Text
          data-testid={generateTestId(textToShow)}
          variant={bold ? 'caption1' : 'body2'}
          component="span"
          className={clsx('badgeText', classes.badgeText)}
        >
          {textToShow}
          {shouldTruncateText && '...'}
        </Text>
        {additionalText && (
          <Text
            data-testid={generateTestId(additionalText)}
            variant={bold ? 'caption1' : 'body2'}
            className={clsx('additionalText', classes.additionalText)}
          >
            {additionalText}
          </Text>
        )}

        {canDismissEllipsis && (
          <div className={classes.showMore} onClick={() => setShowAll(!showAll)}>
            <Text className={classes.showMoreText} variant="caption1">
              {showAll ? 'Show Less' : 'Show More'}
            </Text>
          </div>
        )}
      </div>
    </Tooltip>
  )
}

interface StyleProps {
  variant: BadgeProps['variant']
}
const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  badge: {
    width: 'max-content',
    borderRadius: 4,
    padding: '2px 8px 4px 8px',
    color: ({ variant }) => theme.components.badge?.[variant]?.color,
    backgroundColor: ({ variant }) => theme.components.badge?.[variant]?.background,
    whiteSpace: 'nowrap',
    border: ({ variant }) => `1px solid ${theme.components.badge?.[variant]?.background}`,
  },
  badgeText: {
    color: ({ variant }) => theme.components.badge?.[variant]?.color,
  },
  additionalText: {
    display: 'inline-table',
    margin: '-2px -8px -4px 8px',
    color: ({ variant }) => theme.components.badge?.[variant]?.color,
    backgroundColor: ({ variant }) =>
      lightenDarkenColor(theme.components.badge?.[variant]?.background, 15),
  },
}))
