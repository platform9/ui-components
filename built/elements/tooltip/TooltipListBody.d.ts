import React from 'react';
export interface TooltipProps<T> {
    items: T[];
    nameKey?: keyof T;
    className?: string;
    renderIcon?: (item: T) => React.ReactNode;
}
export default function TooltipListBody<T>({ items, className, nameKey, renderIcon, }: TooltipProps<T>): JSX.Element;
