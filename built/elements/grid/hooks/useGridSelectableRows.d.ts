import { FC, ReactNode } from 'react';
import { ParsedGridRow } from './useGridRows';
export interface GridBatchActionsConfig<T> {
    multiSelection?: boolean;
    disableRowSelection?: boolean;
    rowIsSelectableFn?: (item: T) => boolean;
    selectedItems?: T[];
    onSelectChange?: (selectedItems: T[]) => void;
    isControlled?: boolean;
    totalItems?: number;
    batchActions?: Array<GridBatchActionSpec<T>>;
    onRefresh?: () => void | Promise<void>;
}
export interface BatchActionButtonProps<T> {
    onClick: () => void | Promise<void>;
    children: string | ReactNode;
    disabled?: boolean;
    icon?: string;
    className?: string;
}
export interface GridBatchActionSpec<T> {
    cond?: (selectedItems: T[]) => boolean;
    label?: string | ReactNode;
    icon?: string;
    handleAction?: (selectedItems: T[]) => boolean | void | Promise<boolean | void>;
    keepRowsSelected?: boolean;
    refreshAfterSuccess?: boolean;
    onComplete?: (success: any, selectedItems: T[]) => boolean | void | Promise<boolean | void>;
    BatchActionButton?: FC<BatchActionButtonProps<T>>;
}
export interface SelectableParsedGridRow<T> extends ParsedGridRow<T> {
    isSelected?: boolean;
    isSelectable?: boolean;
    multiSelection?: boolean;
    toggleSelect?: () => void;
    select?: () => void;
    unselect?: () => void;
}
export type SelectionStatus = 'all' | 'some' | 'none';
export interface GridBatchActionProps<T> {
    key: string | number;
    label: string | ReactNode;
    disabled: boolean;
    triggerAction: () => void;
    BatchActionButton: FC<BatchActionButtonProps<T>>;
}
export interface GridBatchActionsProps<T> {
    batchActionsDisabled: boolean;
    batchActions?: GridBatchActionProps<T>[];
    rowsSelectionDisabled: boolean;
    multiSelectionEnabled?: boolean;
    selectedItems?: T[];
    selectedCount?: number;
    toggleSelectAll?: () => void;
    clearSelectedRows?: () => void;
    selectionStatus?: SelectionStatus;
}
export default function useGridSelectableRows<T>(rows: Array<ParsedGridRow<T>>, { batchActions: rowActionsSpec, multiSelection, rowIsSelectableFn, totalItems, selectedItems, onSelectChange, isControlled, disableRowSelection, onRefresh, }: GridBatchActionsConfig<T>): [Array<SelectableParsedGridRow<T>>, GridBatchActionsProps<T>];
