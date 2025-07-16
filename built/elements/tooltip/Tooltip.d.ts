import React, { ReactNode, PropsWithChildren } from 'react';
export interface Align {
    vertical: 'top' | 'middle' | 'bottom';
    horizontal: 'left' | 'middle' | 'right';
}
export interface TooltipProps {
    message?: string | ReactNode;
    customBody?: ReactNode;
    align?: Align;
    offset?: {
        vertical: number;
        horizontal: number;
    };
    origin?: string;
    customClassName?: string;
}
declare const Tooltip: React.FC<PropsWithChildren<TooltipProps & {
    className?: string;
}>>;
export default Tooltip;
