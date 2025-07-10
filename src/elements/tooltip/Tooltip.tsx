import React, { ReactNode, PropsWithChildren } from 'react'
import MUITooltip from '@material-ui/core/Tooltip'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'

export interface Align {
  vertical: 'top' | 'middle' | 'bottom'
  horizontal: 'left' | 'middle' | 'right'
}
export interface TooltipProps {
  message?: string | ReactNode
  customBody?: ReactNode
  align?: Align
  offset?: {
    vertical: number
    horizontal: number
  }
  origin?: string
}

// Map Align to MUI placement string
function mapAlignToPlacement(align?: Align): string {
  if (!align) return 'right'
  const { vertical, horizontal } = align
  if (vertical === 'top') {
    if (horizontal === 'left') return 'top-start'
    if (horizontal === 'middle') return 'top'
    if (horizontal === 'right') return 'top-end'
  }
  if (vertical === 'middle') {
    if (horizontal === 'left') return 'left'
    if (horizontal === 'middle') return 'bottom' // fallback
    if (horizontal === 'right') return 'right'
  }
  if (vertical === 'bottom') {
    if (horizontal === 'left') return 'bottom-start'
    if (horizontal === 'middle') return 'bottom'
    if (horizontal === 'right') return 'bottom-end'
  }
  return 'right'
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps & { className?: string }>> = ({
  message,
  customBody,
  align,
  offset, // Not directly supported by MUI Tooltip, can be handled via PopperProps if needed
  origin, // Not directly supported, but can be handled via placement
  children,
  className,
  ...rest
}) => {
  const placement = mapAlignToPlacement(align)
  const tooltipContent = customBody ?? message
  const classes = useStyles({
    customBody: React.isValidElement(customBody),
  })

  return (
    <MUITooltip
      title={tooltipContent || ''}
      placement={placement as any}
      classes={{ tooltip: classes.muiTooltip }}
      PopperProps={
        offset
          ? {
              modifiers: {
                offset: { enabled: true, offset: `${offset.horizontal},${offset.vertical}` },
              },
            }
          : undefined
      }
      interactive
      {...rest}
    >
      <div className={clsx(className, 'tooltip-container')}>{children}</div>
    </MUITooltip>
  )
}

export default Tooltip

interface StyleProps {
  customBody?: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  muiTooltip: {
    // This is to override MUI's default styles
    ...theme.typography.body2,
    backgroundColor: theme.components.tooltip.background,
    padding: ({ customBody }) => theme.spacing(customBody ? 0 : 1),
    width: 'max-content',
    maxWidth: '400px',
  },
}))
