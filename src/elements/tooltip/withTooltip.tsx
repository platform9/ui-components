import React, { FC } from 'react'
import Tooltip, { TooltipProps } from './Tooltip'

export type PropsWithTooltip<P> = {
  tooltip?: string | React.ReactNode
  tooltipProps?: Omit<TooltipProps, 'message'>
} & P

export default function withTooltip<P>(
  Component: FC<P>,
  defaultTooltipProps: Omit<TooltipProps, 'message'> = {},
): FC<PropsWithTooltip<P>> {
  return (props) => {
    const { tooltip, tooltipProps = defaultTooltipProps, ...rest } = props
    return (
      <Tooltip message={tooltip} {...tooltipProps}>
        <Component {...(rest as P)} />
      </Tooltip>
    )
  }
}
