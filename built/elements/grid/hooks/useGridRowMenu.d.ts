import { FC, ReactNode } from 'react';
import { ParsedGridRow } from './useGridRows';
export interface GridRowMenuConfig<T> {
    rowMenuItems?: Array<GridRowMenuHeader | GridRowMenuItemSpec<T>>;
    rowMenuOffset?: GridRowMenuOffset;
    onRefresh?: (...args: unknown[]) => void | Promise<void>;
    showRowMenuForSingleRowActions?: boolean;
    maxRowMenuHeight?: number;
}
export interface GridRowMenuOffset {
    vertical?: number;
}
export interface GridRowMenuHeader {
    title?: string;
    insertDivider?: boolean;
}
export interface GridRowMenuItemSpec<T> {
    cond?: (item: T) => boolean;
    label?: string | ReactNode;
    icon?: string;
    handleClick?: (item: T) => boolean | void | Promise<boolean | void | unknown>;
    refreshAfterSuccess?: boolean;
    onComplete?: (success: any, item: T) => boolean | void | Promise<boolean | void>;
    RowMenuButton?: FC<RowMenuButtonProps<T>>;
    hideIfDisabled?: boolean;
}
export interface RowMenuButtonProps<T> {
    onClick: () => void | Promise<void>;
    children: string | ReactNode;
    disabled?: boolean;
    icon?: string;
    className?: string;
}
export interface GridRowMenuItemsProps<T> {
    rowMenuDisabled: boolean;
    rowMenuItems?: Array<GridRowMenuHeader | GridRowMenuItemProps<T>>;
    rowMenuOffset?: GridRowMenuOffset;
    showRowMenuForSingleRowActions?: boolean;
    maxRowMenuHeight?: number;
}
export interface GridRowMenuItemProps<T> {
    key: string | number;
    label: string | ReactNode;
    icon?: string;
    getIsDisabled: (item: T) => boolean;
    triggerAction: (item: T) => void;
    RowMenuButton: FC<RowMenuButtonProps<T>>;
    hideIfDisabled?: boolean;
}
export declare const isGridRowMenuHeader: (item: any) => item is GridRowMenuHeader;
export default function useGridRowMenu<T>(rows: Array<ParsedGridRow<T>>, { rowMenuItems: rowActionsSpec, onRefresh, rowMenuOffset, showRowMenuForSingleRowActions, maxRowMenuHeight, }: GridRowMenuConfig<T>): [Array<ParsedGridRow<T>>, GridRowMenuItemsProps<T>];
