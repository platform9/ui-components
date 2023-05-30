import { ReactNode, FC, PropsWithChildren } from 'react';
import { GridFilteringProps } from './hooks/useGridFiltering';
import { GridBatchActionsProps } from './hooks/useGridSelectableRows';
import { GridManagedColumnsProps } from './hooks/useGridManagedColumns';
interface GridToolbarProps<T, GF extends Record<string, unknown>, F extends Record<string, unknown>, DF extends Record<string, unknown>> extends GridFilteringProps<GF, F, DF>, GridBatchActionsProps<T>, GridManagedColumnsProps {
    compact?: boolean;
    label?: string;
    onRefresh?: () => void | Promise<void>;
    extraToolbarContent?: ReactNode;
    ToolbarContainer?: FC<PropsWithChildren<{
        className?: string;
        selectedCount?: number;
    }>>;
    showItemsCountInLabel?: boolean;
    itemsCount?: number;
    tooltip?: ReactNode;
}
export default function GridToolbar<T, GF extends Record<string, unknown>, F extends Record<string, unknown>, DF extends Record<string, unknown>>(props: GridToolbarProps<T, GF, F, DF>): JSX.Element;
export {};
