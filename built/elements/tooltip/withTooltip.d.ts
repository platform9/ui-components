import React, { FC } from 'react';
import { TooltipProps } from './Tooltip';
export declare type PropsWithTooltip<P> = {
    tooltip?: string | React.ReactNode;
    tooltipProps?: Omit<TooltipProps, 'message'>;
} & P;
export default function withTooltip<P>(Component: FC<P>, defaultTooltipProps?: Omit<TooltipProps, 'message'>): FC<PropsWithTooltip<P>>;
