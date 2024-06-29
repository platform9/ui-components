import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { GridExpandedRowsConfig } from './hooks/useGridExpandedRows';
import { GridFilteringConfig } from './hooks/useGridFiltering';
import { GridManagedColumnSpec, GridManagedColumnsConfig } from './hooks/useGridManagedColumns';
import { GridPaginationConfig } from './hooks/useGridPagination';
import { GridRowMenuConfig } from './hooks/useGridRowMenu';
import { Accessor, GridBaseConfig, GridColumnSpec } from './hooks/useGridRows';
import { GridBatchActionsConfig } from './hooks/useGridSelectableRows';
import { GridSortableColumnSpec, GridSortingConfig } from './hooks/useGridSorting';
interface GridViewConfig {
    label?: string;
    emptyContent?: ReactNode;
    extraToolbarContent?: ReactNode;
    loading?: boolean;
    loadingMessage?: string;
    compact?: boolean;
    onRefresh?: (...args: unknown[]) => void | Promise<void>;
    disableToolbar?: boolean;
    ToolbarContainer?: FC<PropsWithChildren<{
        className?: string;
        selectedCount?: number;
    }>>;
    showItemsCountInLabel?: boolean;
    tooltip?: ReactNode;
    hidePagination?: boolean;
}
export type GridViewColumn<T, A extends Accessor<T> = Accessor<T>> = GridColumnSpec<T, A> & GridSortableColumnSpec & GridManagedColumnSpec<T>;
export interface GridProps<T, GF extends Record<string, unknown> = Record<string, unknown>, F extends Record<string, unknown> = Record<string, unknown>, C extends GridViewColumn<T> = GridViewColumn<T>> extends GridViewConfig, GridBaseConfig<T, C>, GridSortingConfig<C>, GridFilteringConfig<T, GF, F>, GridPaginationConfig, GridRowMenuConfig<T>, GridBatchActionsConfig<T>, GridExpandedRowsConfig<T>, GridManagedColumnsConfig<T, C> {
}
export type GridContextType<T> = {
    triggerRefresh?: () => void;
    selectedItems?: T[];
    clearSelectedRows?: () => void;
};
export declare const GridContext: React.Context<{}>;
/**
 * Convenience shortcut for `useContext<GridContextType<T>>(GridContext)`
 */
export declare function useGridContext<T>(): GridContextType<T>;
export default function Grid<T, GF extends Record<string, unknown> = Record<string, unknown>, F extends Record<string, unknown> = Record<string, unknown>>(configProps: GridProps<T, GF, F>): JSX.Element;
export {};
