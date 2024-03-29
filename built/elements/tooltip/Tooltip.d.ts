import React, { ReactNode } from 'react';
export interface TooltipProps {
    message?: string | ReactNode;
    customBody?: ReactNode;
    align?: {
        vertical: 'top' | 'middle' | 'bottom';
        horizontal: 'left' | 'middle' | 'right';
    };
    offset?: {
        vertical: number;
        horizontal: number;
    };
    origin?: string;
    customClassName?: string;
}
declare const _default: import("@material-ui/styles").StyledComponent<Pick<TooltipProps & {
    className: string;
} & {
    children?: React.ReactNode;
}, "children" | keyof TooltipProps> & import("@material-ui/styles").StyledComponentProps<"root"> & {
    className?: string;
    theme?: import("@material-ui/styles").DefaultTheme;
}>;
export default _default;
