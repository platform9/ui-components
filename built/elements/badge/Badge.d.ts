import React from 'react';
import { TooltipProps } from '../../elements/tooltip/Tooltip';
export declare type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'unknown' | 'danger' | 'error';
interface BadgeProps {
    text: string;
    additionalText?: string;
    variant: BadgeVariant;
    ellipsisAt?: number;
    canDismissEllipsis?: boolean;
    bold?: boolean;
    tooltipBody?: React.ReactNode;
    tooltipProps?: Partial<TooltipProps>;
    className?: string;
}
export default function Badge({ text, additionalText, variant, ellipsisAt, canDismissEllipsis, bold, tooltipBody, tooltipProps, className, }: BadgeProps): JSX.Element;
export {};
